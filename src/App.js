import { Helmet } from 'react-helmet';
import './App.css';
import { DataProvider } from './context/WeatherContext';
// import { useEffect } from 'react';

function App() {
  // useEffect(() => {
  //   document.title = "Weather App";
  // }, []); 

  return (
    <div className="App">
      <Helmet>
        <title>Sanjaisiva's Weather App</title>
        <link rel="icon" href="D:\REACT\weather\public\app_icons\clouds-and-sun.png" />
      </Helmet>
      <DataProvider />
    </div>
  );
}

export default App;
