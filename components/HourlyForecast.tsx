'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/store/hooks';
import { formatTime } from '@/lib/weatherUtils';
import type { ForecastItem } from '@/store/weatherSlice';

const detailFields: Array<{ label: string; get: (item: ForecastItem) => string }> = [
  { label: 'Feels Like', get: (i) => `${i.main.feels_like}°C` },
  { label: 'Max Temp', get: (i) => `${Math.round(i.main.temp_max)}°C` },
  { label: 'Min Temp', get: (i) => `${Math.round(i.main.temp_min)}°C` },
  { label: 'Humidity', get: (i) => `${i.main.humidity}%` },
  { label: 'Pressure', get: (i) => `${i.main.pressure} hPa` },
  { label: 'Wind', get: (i) => `${i.wind.speed} m/s` },
  { label: 'Clouds', get: (i) => `${i.clouds.all}%` },
  { label: 'Sea Level', get: (i) => (i.main.sea_level ? `${i.main.sea_level} hPa` : 'N/A') },
];

export default function HourlyForecast() {
  const forecastData = useAppSelector((s) => s.weather.forecastData);
  const [expanded, setExpanded] = useState<number | null>(null);

  if (!forecastData?.list) return null;

  const items = forecastData.list.slice(0, 5);

  return (
    <div className="glass-card p-5 mb-4">
      <h2 className="section-title">Next 5 Hours</h2>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setExpanded(expanded === idx ? null : idx)}
            className={`forecast-slot ${
              expanded === idx
                ? 'bg-white/30 border border-white/40 shadow-lg'
                : 'bg-white/10 border border-white/10 hover:bg-white/20'
            }`}
          >
            <p className="text-white/60 text-xs mb-2">
              {formatTime(item.dt_txt.split(' ')[1])}
            </p>
            <Image
              src={`/icons/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
              width={36}
              height={36}
              className="mx-auto mb-2"
            />
            <p className="text-white/70 text-xs capitalize leading-tight line-clamp-2 mb-1">
              {item.weather[0].description}
            </p>
            <p className="text-white font-bold text-sm">
              {Math.round(item.main.temp)}°C
            </p>
          </button>
        ))}
      </div>

      {expanded !== null && (
        <div className="detail-panel mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {detailFields.map(({ label, get }) => (
            <div key={label} className="detail-cell">
              <p className="text-white/50 text-xs uppercase tracking-wide">{label}</p>
              <p className="text-white font-medium text-sm mt-0.5">{get(items[expanded])}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
