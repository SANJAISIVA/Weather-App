import { createContext, useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import PresentDayForecast from "../components/presentDayForecast/PresentDayForecast";
import HourlyForecast from "../components/hourlyForecast/HourlyForecast";
import WeekForecast from "../components/weekForecast/WeekForecast";

const WeatherContext = createContext();

export const DataProvider = ( { children } ) => {
    const [weatherResults, setWeatherResults] = useState('');
    const [forecastResults, setForecastResults] = useState('');
    const [weatherColor, setWeatherColor] = useState('lightblue'); 
    const [city, setCity] =useState('Coimbatore');

    
    const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
    const WEATHER_API_KEY = "d7814b72bcf662e8478b5dfeec6553d9";

    // for focus to input
    const inputRefer = useRef(null);

    
    useEffect( () => {
      handleFetch();
    },[] );

    const handleFetch = async () => {
      console.log(city);
      if (city.trim()) {
        try {
            const weatherFetch = await fetch(`${WEATHER_API_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
            const weatherData = await weatherFetch.json();
            if (!weatherData || !weatherData.sys || !weatherData.sys.country) {
                console.log('No data for the selected city.');
                alert(`${city} not found😓. Enter right city`);
                return;
            }
            console.log("Weather Data", weatherData);
            setWeatherResults(weatherData);
            
            const forecastFetch = await fetch(`${WEATHER_API_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
            const forecastData = await forecastFetch.json();
            console.log("Forecast Data", forecastData);
            setForecastResults(forecastData);
            
            inputRefer.current.focus();
          } catch (error) {
            console.error('Error:', error);
          }
      } else { alert('Please enter a city name.'); }
    };

    // Handle live location
    const handleLiveLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, fail);
          inputRefer.current.focus();
        } else {
          alert('Geolocation is not supported');
          
        }
    }

    function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        
        fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
          .then(response => response.json())
          .then(data => {
            setCity(data.name);
            setWeatherResults(data);
            console.log("Live Location: ",data.name);
          })
          .catch(error => console.log(error));
    }
    
    function fail() {
        alert("Unable to fetch your location")
        console.log("Unable to retrieve your location");
    }

    // seperate time from dt_txt key
    const handleTime = (time) => {
      let [hours, minutes] = time.split(":");
      let suffix = "AM"
      hours = parseInt(hours)
  
      if(hours >= 12){
          suffix = "PM"
          if (hours > 12) hours -= 12;
      } else if(hours === 0){
          hours = 12;
      }    
      return `${hours}:${minutes} ${suffix}`;
    }


    return (
        <WeatherContext.Provider value= { {  
            
            setWeatherResults,
            setForecastResults, 
            weatherResults, 
            forecastResults, 
            weatherColor, 
            setWeatherColor,  
            handleLiveLocation, 
            city , 
            setCity,
            handleFetch,
            handleTime,
            inputRefer

        } }>
            { children }
            <Header/>
            {
              weatherResults && <PresentDayForecast weatherResults={weatherResults}/>
            }

            <HourlyForecast />
            
            <WeekForecast />
        </WeatherContext.Provider>
    )
}

export default WeatherContext