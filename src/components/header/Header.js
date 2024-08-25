import React, { useContext } from 'react'
import './Header.css'
import WeatherContext from '../../context/WeatherContext';
const Header = ( ) => {

    const { handleFetch, city, setCity, handleLiveLocation, inputRefer } = useContext(WeatherContext);
 
    return (
        <div>
            <h1>Weather App</h1>
            <form className='header-form' onSubmit={(e)=> e.preventDefault()}>
                <input
                    ref={inputRefer}
                    type="text"
                    placeholder='Enter the city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={handleFetch} className='main-button' >Fetch</button>
                <button onClick={handleLiveLocation} className='main-button current font'>Current Location</button>
            </form>
        </div>
    );
}

export default Header