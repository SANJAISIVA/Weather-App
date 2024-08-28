import { useContext, useState } from 'react';
import './HourlyForecast.css'
import WeatherContext from '../../context/WeatherContext';

const HourlyForecast = (  ) => {

  const {forecastResults, handleTime} = useContext(WeatherContext);

   // for single selection and multiselection
   const [selected, setSelected] = useState(null);

   const handleSingleSelect = (index) => {
    //  console.log(index);
     setSelected(index === selected ? null : index );
   }

   const [multiSelect, setMultiSelect] = useState(false);
   const [multiSelectedItems, setMultiSelectedItems] = useState([]);

   const handleMultiSelect = (index) => {
     let tempArray = [...multiSelectedItems];
     const findIndexOfCurrent = tempArray.indexOf(index);
     if(findIndexOfCurrent === -1){
       tempArray.push(index);
     } else{
       tempArray.splice(findIndexOfCurrent, 1);
     }
     setMultiSelectedItems(tempArray);
    //  console.log(tempArray);
   }

  if (!forecastResults || !forecastResults.list) {
    // console.log("No forecast data available");
    return <></>;
  }

  return (
    <div className="forecast-container">
        <div className="forecast-header">
          <label className="title">Hourly Forecast</label>
          {/* <button onClick={() => {setMultiSelect(!multiSelect); changeButtonData() } } className="multi-select-button" style={{ backgroundColor: buttonColor }}>{buttonData}</button> */}
          <div class="container">
                <input type="checkbox" id="check" className="button-input" onClick={() => setMultiSelect(!multiSelect)}/>
                <label for="check" class="switch"></label>
                <label className="multi-view">Multi View</label>
          </div>
        </div>

        {
          forecastResults && 
          (
            forecastResults.list.slice(0,5).map( (item, idx) => (
              <div
                className="forecastResults"
                onClick={multiSelect ? () => handleMultiSelect(idx) : () => handleSingleSelect(idx)}
                key={idx}>
                <div className="daily-item">
                    <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                    <p className="time">{handleTime(item.dt_txt.split(" ")[1])}</p>
                    <p className="description">{item.weather[0].description}</p>
                    <p className="temp">{Math.round(item.main.temp)}°C</p>
                </div>

                {
                  multiSelect ? 
                  multiSelectedItems.indexOf(idx) !== -1 &&

                    <div className="daily-details-container">
                      <div className="daily-details-grid">
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
            )
          )
        )
        }      
    </div>
  )
}

export default HourlyForecast


