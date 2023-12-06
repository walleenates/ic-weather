import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Weather.css';

const apiKey = 'f3d63edaab9494e7d0b7a1e530abcd1c';

const SearchBar = ({ fetchWeather }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search Query:', searchQuery);
    fetchWeather(searchQuery);
    setSearchQuery('');
  };


  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter barangay in Iligan City"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};


function Weather() {
  const [weather, setWeather] = useState(null);

  const fetchWeather = useCallback(async (location) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
      );
      console.log('API Response:', response.data);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, []);

  useEffect(() => {
    fetchWeather('Iligan'); // Set a default location
  }, [fetchWeather]);


  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
        return 'clear-sky-day.png';
      case '01n':
        return 'clear-sky-night.png';
      case '02d':
        return 'few-clouds-day.png';
      case '02n':
        return 'few-clouds-night.png';

      default:
        return null;
    }
  };

  if (!weather) {
    return <div className="loading">Loading...</div>;
  }

  const weatherIcon = getWeatherIcon(weather.weather[0].icon);

  return (
    <div className="weather-container">
      <div className="logo">
        <img src="logoweather.png" alt="Logo" />
      </div>
      <SearchBar fetchWeather={fetchWeather} />
      
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${weatherIcon || 'few-clouds-night.png'})`,
        }}
      ></div>
      <div className="weather-content">
        <p className="time">{weather.time}</p>
        <h1 className="city">Iligan City Weather Forecast</h1>
        <p className="temperature">
          Temperature: {(weather.main.temp - 273.15).toFixed(2)} Â°C
        </p>
        {weather.weather[0].description && (
          <p className="weather-condition">{weather.weather[0].description}</p>
        )}
      </div>
    </div>
  );
}

export default Weather;