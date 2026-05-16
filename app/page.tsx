'use client';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { getWeatherGradient } from '@/lib/weatherUtils';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import HourlyForecast from '@/components/HourlyForecast';
import WeeklyForecast from '@/components/WeeklyForecast';

export default function Home() {
  const { weatherData, loading, error } = useAppSelector((s) => s.weather);

  const [gradient, setGradient] = useState(() => getWeatherGradient(800, true));

  useEffect(() => {
    if (!weatherData) return;
    const id = weatherData.weather[0].id;
    const isDay = weatherData.weather[0].icon?.endsWith('d') ?? true;
    setGradient(getWeatherGradient(id, isDay));
  }, [weatherData]);

  const showEmpty = !loading && !weatherData && !error;

  return (
    <>
      <div className={`fixed inset-0 -z-10 bg-linear-to-br ${gradient} transition-colors duration-700`} />
      <div className="fixed inset-0 -z-10 bg-transparent dark:bg-black/40 pointer-events-none" />

      <main className="min-h-screen">
        <Header />
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
          <SearchBar />

          {error && (
            <div className="bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-2xl px-5 py-4 text-white mb-4">
              <p className="font-semibold text-sm">City not found</p>
              <p className="text-white/70 text-xs mt-0.5">{error}</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              <p className="text-white/60 text-sm">Fetching weather data…</p>
            </div>
          )}

          {showEmpty && (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-white/60 text-center">
              <svg className="w-12 h-12 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-base font-medium">Search for a city</p>
              <p className="text-sm opacity-70">or use your current location</p>
            </div>
          )}

          {!loading && weatherData && (
            <>
              <CurrentWeather />
              <HourlyForecast />
              <WeeklyForecast />
            </>
          )}
        </div>
      </main>
    </>
  );
}
