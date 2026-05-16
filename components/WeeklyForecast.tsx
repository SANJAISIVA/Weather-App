'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/store/hooks';
import type { ForecastItem } from '@/store/weatherSlice';

const detailFields: Array<{ label: string; get: (item: ForecastItem) => string }> = [
  { label: 'Feels Like', get: (i) => `${i.main.feels_like}°C` },
  { label: 'Humidity', get: (i) => `${i.main.humidity}%` },
  { label: 'Pressure', get: (i) => `${i.main.pressure} hPa` },
  { label: 'Wind', get: (i) => `${i.wind.speed} m/s` },
  { label: 'Clouds', get: (i) => `${i.clouds.all}%` },
  { label: 'Sea Level', get: (i) => (i.main.sea_level ? `${i.main.sea_level} hPa` : 'N/A') },
];

function formatDay(dateStr: string) {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString('en-US', { weekday: 'long' });
}

function formatShortDate(dateStr: string) {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function WeeklyForecast() {
  const forecastData = useAppSelector((s) => s.weather.forecastData);
  const [expanded, setExpanded] = useState<number | null>(null);

  if (!forecastData?.list) return null;

  const days: Record<string, ForecastItem[]> = {};
  forecastData.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });

  const dailyForecasts = Object.entries(days).map(([date, forecasts]) => ({
    date,
    data: forecasts[Math.floor(forecasts.length / 2)],
  }));

  return (
    <div className="glass-card p-5 mb-6">
      <h2 className="section-title">5 Day Forecast</h2>

      <div className="space-y-2">
        {dailyForecasts.map(({ date, data }, idx) => (
          <div key={date}>
            <button
              onClick={() => setExpanded(expanded === idx ? null : idx)}
              className={`w-full flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-200 active:scale-[0.99] ${
                expanded === idx
                  ? 'bg-white/25 border border-white/30'
                  : 'bg-white/10 border border-white/10 hover:bg-white/20'
              }`}
            >
              <span className="font-medium text-sm w-20 sm:w-28 text-left shrink-0 truncate">
                {formatDay(date)}
              </span>
              <span className="text-white/50 text-xs hidden sm:block w-16 shrink-0">
                {formatShortDate(date)}
              </span>
              <div className="flex items-center gap-2 flex-1 justify-center">
                <Image
                  src={`/icons/${data.weather[0].icon}.png`}
                  alt={data.weather[0].description}
                  width={30}
                  height={30}
                />
                <span className="text-white/60 text-xs capitalize hidden md:block">
                  {data.weather[0].description}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold shrink-0">
                <span className="text-white/50">{Math.round(data.main.temp_min)}°</span>
                <span className="text-white/30">/</span>
                <span>{Math.round(data.main.temp_max)}°C</span>
              </div>
              <svg
                className={`w-4 h-4 text-white/40 ml-3 shrink-0 transition-transform duration-200 ${
                  expanded === idx ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expanded === idx && (
              <div className="detail-panel mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {detailFields.map(({ label, get }) => (
                  <div key={label} className="detail-cell">
                    <p className="text-white/50 text-xs uppercase tracking-wide">{label}</p>
                    <p className="text-white font-medium text-sm mt-0.5">{get(data)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-white/30 text-xs mt-6 pt-4 border-t border-white/10">
        © {new Date().getFullYear()}&nbsp;Sanjaisiva&apos;s Weather App — Powered by OpenWeatherMap
      </p>
    </div>
  );
}
