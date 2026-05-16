import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const BASE = 'https://api.openweathermap.org/data/2.5';

  let url: string;
  if (city) {
    url = `${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  } else if (lat && lon) {
    url = `${BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  } else {
    return NextResponse.json({ message: 'Missing query parameters.' }, { status: 400 });
  }

  const res = await fetch(url, { next: { revalidate: 300 } });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
