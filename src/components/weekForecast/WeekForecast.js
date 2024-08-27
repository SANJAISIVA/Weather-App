import { useContext, useState } from 'react';
import '../hourlyForecast/HourlyForecast.css'
import '../weekForecast/WeekForecast.css'
import moment from 'moment';
import WeatherContext from '../../context/WeatherContext';
const WeeklyForecast = () => {

  const { forecastResults } = useContext(WeatherContext)
  
  const [selected, setSelected] = useState(null);

  function handleSingleSelect(index) {
    setSelected(index === selected ? null : index );
    // console.log(index);
  }

  const [multiSelect, setMultiSelect] = useState(false);
  const [multiSelectedItems, setMultiSelectedItems] = useState([]);

  function handleMultiSelect(index){
    let tempArray = [...multiSelectedItems];
    const findIndexOfCurrent = tempArray.indexOf(index);
    if(findIndexOfCurrent === -1){
      tempArray.push(index);
    } else{
      tempArray.splice(findIndexOfCurrent, 1);
    }
    setMultiSelectedItems(tempArray);
    // console.log(tempArray);
  }

  if (!forecastResults || !forecastResults.list) {
      // console.log("No forecast data available.");
      return <></>;
  }

  const days = {};
  forecastResults.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!days[date]) {
          days[date] = [];
      }
      days[date].push(item);
  });

  // console.log(days);
  
  const dailyForecasts = Object.keys(days).map(date => {
      const forecasts = days[date];
      const middleIndex = Math.floor(forecasts.length / 2);
      return forecasts[middleIndex];
  });

  const formatDate = (dateStr) => {
    const dateObj = moment(dateStr, 'YYYY-MM-DD');
  return dateObj.format('dddd'); 
  };

  return (
      <div>
          <div className="five-forecast-header">
            <label className="title">5 days Forecast</label>
            <div class="container-2">
              <input type="checkbox" id="check-2" className="button-input-2" onClick={() => setMultiSelect(!multiSelect)}/>
              <label for="check-2" class="switch-2"></label>
              <label className="multi-view">Multi View</label>
            </div>
          </div>

          {dailyForecasts.map((item, idx) => (
            <div
              className="forecastResults"
              onClick={multiSelect ? () => handleMultiSelect(idx) : () => handleSingleSelect(idx)}
              key={idx}>
              <div className="daily-item">
                  <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                  <p className="date">{(item.dt_txt.split(" ")[0])}</p>
                  {/* { console.log( (item.dt_txt.split(" ")[0]))} */}
                  <p className="day">{formatDate(item.dt_txt.split(" ")[0])}</p>
                  <p className="description">{item.weather[0].description}</p>
                  <p className="temp">{Math.round(item.main.temp)}°C</p>
              </div>

              {
                multiSelect ? 
                multiSelectedItems.indexOf(idx) !== -1 &&

                  <div className="daily-details-container">
                    <div className="daily-details-grid">
                      <div className="daily-details-grid-item-date">
                        <label>Date:</label>
                        <label>{(item.dt_txt.split(" ")[0])}</label>
                      </div>
                      <div className="daily-details-grid-item">
                        <label>Feels like:</label>
                        <label>{item.main.feels_like}°C</label>
                      </div>
                      <div className="daily-details-grid-item">
                        <label>Max temp</label>
                        <label>{Math.round(item.main.temp_max)}°C</label>
                      </div>
                      <div className="daily-details-grid-item">
                        <label>Min temp</label>
                        <label>{Math.round(item.main.temp_min)}°C</label>
                      </div>
                      <div className="daily-details-grid-item">
                        <label>Pressure:</label>
                        <label>{item.main.pressure}hPa</label>
                      </div>
                      <div className="daily-details-grid-item">
                        <label>Humidity:</label>
                        <label>{item.main.humidity}%</label>
                      </div>
                      <div className="daily-details-grid-item">
                        <label>Clouds:</label>
                        <label>{item.clouds.all}%</label>
                      </div>
                      <div className="daily-details-grid-item">
                        <label>Wind speed:</label>
                        <label>{item.wind.speed} m/s</label>
                      </div>
                      <div className="daily-details-grid-item">
                        <label>Sea level:</label>
                        <label>{item.main.sea_level}m</label>
                      </div>
                    </div>
                </div> 

                : selected === idx &&

                <div className="daily-details-container">
                    <div className="daily-details-grid">
                      <div className="daily-details-grid-item-date">
                        <label>Date:</label>
                        <label>{(item.dt_txt.split(" ")[0])}</label>
                      </div>
                      <div className="daily-details-grid-item">
                        <label>Feels like:</label>
                        <label>{item.main.feels_like}°C</label>
                      </div>
                      <div className="daily-details-grid-item">
                        <label>Max temp</label>
                        <label>{Math.round(item.main.temp_max)}°C</label>
                      </div>
                      <div className="daily-details-grid-item">
                        <label>Min temp</label>
                        <label>{Math.round(item.main.temp_min)}°C</label>
                      </div>
                      <div className="daily-details-grid-item">
                        <label>Pressure:</label>
                        <label>{item.main.pressure}hPa</label>
                      </div>
                      <div className="daily-details-grid-item">
                        <label>Humidity:</label>
                        <label>{item.main.humidity}%</label>
                      </div>
                      <div className="daily-details-grid-item">
                        <label>Clouds:</label>
                        <label>{item.clouds.all}%</label>
                      </div>
                      <div className="daily-details-grid-item">
                        <label>Wind speed:</label>
                        <label>{item.wind.speed} m/s</label>
                      </div>
                      <div className="daily-details-grid-item">
                        <label>Sea level:</label>
                        <label>{item.main.sea_level}m</label>
                      </div>
                    </div>
                </div> 
              }
            </div>
          ))}
          
          <footer>
              Copyright &copy; {new Date().getFullYear()} All rights reserved.
          </footer>
      </div>
  );
};

export default WeeklyForecast;