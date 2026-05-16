'use client';

export default function Header() {
  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center tracking-tight">
          Weather App
        </h1>
        <p className="mt-2 text-white/60 text-sm sm:text-base text-center">
          Get real-time weather updates for any location
        </p>
      </div>
    </header>
  );
}
