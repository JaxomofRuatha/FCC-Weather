import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

  const iconOptions = (currentIcon) => {
    switch (currentIcon) {
      case "clear-day": return {
        icon: 'CLEAR_DAY',
        color: '#fce637',
      };
      case "clear-night": return {
        icon: 'CLEAR_NIGHT',
        color: '#FFFFFF',
      };
      case "partly-cloudy-day": return {
        icon: 'PARTLY_CLOUDY_DAY',
        color: '#FFFDED',
      };
      case "partly-cloudy-night": return {
        icon: 'PARTLY_CLOUDY_NIGHT',
        color: '#edf4ff',
      };
      case "cloudy": return {
        icon: 'CLOUDY',
        color: '#edf4ff',
      };
      case "rain": return {
        icon: 'RAIN',
        color: '#91bbff',
      };
      case "sleet": return {
        icon: 'SLEET',
        color: '#7d99c6',
      };
      case "snow": return {
        icon: 'SNOW',
        color: '#c2cad6',
      };
      case "wind": return {
        icon: 'CLEAR_DAY',
        color: 'goldenrod',
      };
      case "fog": return {
        icon: 'FOG',
        color: '#cdd1d6',
      };
    }
};
const CurrentWeatherDisplay = ({ currentWeather }) => {
  let currentIconOptions = iconOptions(currentWeather.currentIcon) || { "icon": "PARTLY_CLOUDY_DAY", "color": "goldenrod" };
  console.log(currentIconOptions);
    return (
      <div>
        <div id="weather-summary"> 
          <ReactAnimatedWeather icon={currentIconOptions.icon} color={currentIconOptions.color} size={150} animate={true} />
          <h1>{currentWeather.currentSummary}</h1>
          <h1>{Math.round(currentWeather.currentTemp)}</h1>
          <button>Change temperature type!</button>
        </div>
        <div id="weather-misc">
          <p>
            Wind: {currentWeather.currentWind} mph
            Humidity: {currentWeather.currentHumidity * 100}%
            Visibility: {currentWeather.currentVisibility || "Miles"} miles
          </p>
        </div>
        <div>
          <p>{currentWeather.currentDaySummary}</p>
        </div>
      </div>
    );
  }

export default CurrentWeatherDisplay;