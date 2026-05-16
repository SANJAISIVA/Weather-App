'use client';
import { useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, MapPinIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCity, fetchWeatherByCity, fetchWeatherByLocation, clearWeather } from '@/store/weatherSlice';
import ThemeToggle from './ThemeToggle';

const SEARCH_STORAGE_KEY = 'lastSearchedCity';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const city = useAppSelector((s) => s.weather.city);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedCity = localStorage.getItem(SEARCH_STORAGE_KEY);
    if (savedCity) {
      dispatch(setCity(savedCity));
      dispatch(fetchWeatherByCity(savedCity));
    }
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    localStorage.setItem(SEARCH_STORAGE_KEY, city.trim());
    dispatch(fetchWeatherByCity(city.trim())).then(() => inputRef.current?.focus());
  };

  const handleLiveLocation = () => {
    dispatch(fetchWeatherByLocation()).then(() => inputRef.current?.focus());
  };

  const handleClear = () => {
    dispatch(clearWeather());
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    localStorage.removeItem(SEARCH_STORAGE_KEY);
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-2 sm:gap-3 mb-6">
      <form className="search-form flex-1 min-w-0 sm:flex-initial" onSubmit={handleSubmit}>
        <MagnifyingGlassIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={city}
          onChange={(e) => dispatch(setCity(e.target.value))}
          placeholder="Search city..."
          className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-xs sm:text-sm leading-none min-w-0"
        />
        {city && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 bg-transparent hover:bg-white/10 active:scale-95 transition-all text-white shrink-0 rounded-xl"
            title="Clear search"
          >
            <XMarkIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        )}
      </form>

      <button
        onClick={handleLiveLocation}
        className="icon-btn shrink-0"
        title="Use current location"
      >
        <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <ThemeToggle />
    </div>
  );
}
