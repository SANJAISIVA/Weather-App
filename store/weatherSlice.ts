import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

export interface WeatherData {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  weather: Array<{ id: number; main: string; description: string; icon: string }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
    sea_level?: number;
  };
  wind: { speed: number; deg: number };
  clouds: { all: number };
  visibility: number;
  coord: { lat: number; lon: number };
}

export interface ForecastItem {
  dt_txt: string;
  weather: Array<{ id: number; main: string; description: string; icon: string }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
    sea_level?: number;
  };
  wind: { speed: number; deg: number };
  clouds: { all: number };
}

export interface ForecastData {
  list: ForecastItem[];
  city: { name: string; country: string };
}

interface WeatherState {
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
  city: string;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  weatherData: null,
  forecastData: null,
  city: '',
  loading: false,
  error: null,
};

type FetchResult = { weather: WeatherData; forecast: ForecastData };

export const fetchWeatherByCity = createAsyncThunk<FetchResult, string>(
  'weather/fetchByCity',
  async (city, { rejectWithValue }) => {
    const [weatherRes, forecastRes] = await Promise.all([
      fetch(`/api/weather?city=${encodeURIComponent(city)}`),
      fetch(`/api/forecast?city=${encodeURIComponent(city)}`),
    ]);
    if (!weatherRes.ok) {
      const err = await weatherRes.json();
      return rejectWithValue(err.message || 'City not found. Please try again.');
    }
    const [weather, forecast] = await Promise.all([weatherRes.json(), forecastRes.json()]);
    return { weather, forecast };
  }
);

export const fetchWeatherByLocation = createAsyncThunk<FetchResult>(
  'weather/fetchByLocation',
  async (_, { rejectWithValue }) => {
    if (!navigator.geolocation) {
      return rejectWithValue('Geolocation is not supported by your browser.');
    }
    try {
      const { latitude: lat, longitude: lon } = await new Promise<GeolocationCoordinates>(
        (resolve, reject) =>
          navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos.coords),
            reject
          )
      );
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`/api/weather?lat=${lat}&lon=${lon}`),
        fetch(`/api/forecast?lat=${lat}&lon=${lon}`),
      ]);
      const [weather, forecast] = await Promise.all([weatherRes.json(), forecastRes.json()]);
      return { weather, forecast };
    } catch {
      return rejectWithValue('Unable to retrieve your location. Please allow location access.');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCity(state, action: { payload: string }) {
      state.city = action.payload;
    },
    clearWeather(state) {
      state.city = '';
      state.weatherData = null;
      state.forecastData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.weatherData = payload.weather;
        state.forecastData = payload.forecast;
      })
      .addCase(fetchWeatherByLocation.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.weatherData = payload.weather;
        state.forecastData = payload.forecast;
        state.city = payload.weather.name;
      })
      .addMatcher(
        isAnyOf(fetchWeatherByCity.pending, fetchWeatherByLocation.pending),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchWeatherByCity.rejected, fetchWeatherByLocation.rejected),
        (state, action) => {
          state.loading = false;
          state.error = (action.payload as string) ?? 'Something went wrong.';
        }
      );
  },
});

export const { setCity, clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
