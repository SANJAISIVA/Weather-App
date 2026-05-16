'use client';
import Image from 'next/image';
import { useAppSelector } from '@/store/hooks';
import { formatDate } from '@/lib/weatherUtils';

const statsConfig = [
  { key: 'feels_like', label: 'Feels Like', format: (v: number) => `${Math.round(v)}°C` },
  { key: 'wind', label: 'Wind', format: (v: number) => `${v} m/s` },
  { key: 'humidity', label: 'Humidity', format: (v: number) => `${v}%` },
  { key: 'pressure', label: 'Pressure', format: (v: number) => `${v} hPa` },
];

export default function CurrentWeather() {
  const weatherData = useAppSelector((s) => s.weather.weatherData);
  if (!weatherData) return null;

  const { name, sys, weather, main, wind } = weatherData;
  const statValues: Record<string, number> = {
    feels_like: main.feels_like,
    wind: wind.speed,
    humidity: main.humidity,
    pressure: main.pressure,
  };

  return (
    <div className="glass-card p-6 mb-4">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-white/60 text-xs uppercase tracking-widest mb-1">
            {formatDate(new Date())}
          </p>
          <h1 className="text-2xl font-bold leading-tight">
            {name}, {sys.country}
          </h1>
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest bg-white/20 rounded-full px-3 py-1 mt-1">
          {weather[0].main}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="min-w-0 shrink">
          <p className="text-8xl font-thin tracking-tight leading-none">
            {Math.round(main.temp)}°
          </p>
          <p className="text-white/70 capitalize text-base mt-2 ml-1 truncate">
            {weather[0].description}
          </p>
        </div>
        <Image
          src={`/icons/${weather[0].icon}.png`}
          alt={weather[0].description}
          width={96}
          height={96}
          className="drop-shadow-xl"
          priority
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5 pt-5 border-t border-white/15">
        {statsConfig.map(({ key, label, format }) => (
          <div key={key} className="stat-cell">
            <p className="text-white/50 text-xs uppercase tracking-wide mb-1">{label}</p>
            <p className="text-white font-semibold text-sm">{format(statValues[key])}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
