import { useContext, useEffect, useState } from 'react';
import './PresentDayForecast.css'
import WeatherContext from '../../context/WeatherContext';
const PresentDayForecast = ( ) => {

  const {weatherResults} = useContext(WeatherContext);
  console.log(weatherResults);
  const [weatherColor, setWeatherColor] = useState('lightblue'); 
  const [textColor, setTextColor] = useState('white')

  useEffect( () => {
    const description = weatherResults.weather[0].description;

    switch (description) {
      case "clear sky":
        setWeatherColor("skyblue");
        break;
      case "few clouds":
        setWeatherColor("lightsteelblue");
        break;
      case "scattered clouds":
        setWeatherColor("gray");
        setTextColor("white")
        break;
      case "broken clouds":
        setWeatherColor("darkgray");
        setTextColor("white")
        break;
      case "overcast clouds":
        setTextColor("white")
        setWeatherColor("#B0B0B0");
        break;
      case "light rain":
        setWeatherColor("lightblue");
        setTextColor("black");
        break;
      case "rain":
        setWeatherColor("blue");
        setTextColor("black");
        break;
      case "thunderstorm":
        setWeatherColor("darkblue");
        break;
      case "light snow":
        setWeatherColor("lightblue");
        setTextColor("black");
        break;
      case "mist":
        setWeatherColor("wheat");
        setTextColor("black")
        break;
      case "haze":
        setWeatherColor("wheat");
        setTextColor("black")
        break;
      case "fog":
        setWeatherColor("#A9A9A9");
        setTextColor("black")
        break;
      case "smoke":
        setWeatherColor("dimgray");
        setTextColor("black")
        break;
      case "drizzle":
        setWeatherColor("lightsteelblue");
        setTextColor("black")
        break;
      case "tornado":
        setWeatherColor("darkslategray");
        setTextColor("black")
        break;
      case "squalls":
        setWeatherColor("lightskyblue");
        setTextColor("black")
        break;
      case "sand":
        setWeatherColor("khaki");
        setTextColor("black")
        break;
      case "dust":
        setWeatherColor("peru");
        break;
      case "ash":
        setWeatherColor("darkgray");
        setTextColor("white")
        break;
      default:
        setWeatherColor("lightblue"); 
        setTextColor("black")
        break;
    }   
  }, [weatherResults]);


  const currentDate = new Date();
  const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const dayOfMonth = currentDate.getDate();
  
  const nth = (dayOfMonth) => {
    if (dayOfMonth > 3 && dayOfMonth < 21) return 'th'; 
    switch (dayOfMonth % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <div className="weather" style={ { backgroundColor: weatherColor, color:textColor } }>
      <div className="day-details">
        <p>{day}, {dayOfMonth}{nth(dayOfMonth)} {month} {year}</p>
      </div>

      <div className="top">
        <div>
          <p className="city">{weatherResults.name}, {weatherResults.sys.country}</p>
          <p className="weather-description">{weatherResults.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${weatherResults.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(weatherResults.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {Math.round(weatherResults.main.feels_like)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{weatherResults.wind.speed} m/s</span>
          </div>
          
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{weatherResults.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{weatherResults.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PresentDayForecast