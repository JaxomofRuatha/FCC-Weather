import React from 'react';
import PropTypes from 'prop-types';
import WeatherSummary from './WeatherSummary';
import TempRange from './TempRange';

const CurrentWeatherDisplay = ({ currentWeather }) => (
  <div>
    <WeatherSummary />
    <TempRange />
    <div className="weather-lower">
      <span>
        {`Wind: ${currentWeather.wind} | Humidity: ${Math.floor(currentWeather.humidity * 100)}% | Visibility: ${currentWeather.visibility}`}
      </span>
      <span>{currentWeather.summary}</span>
    </div>
  </div>
);

CurrentWeatherDisplay.propTypes = {
  currentWeather: PropTypes.shape({
    currentTemp: PropTypes.number,
    currentSummary: PropTypes.string,
    currentDaySummary: PropTypes.string,
    currentWind: PropTypes.number,
    currentHumidity: PropTypes.number,
    currentVisibility: PropTypes.number,
    currentIcon: PropTypes.string
  }).isRequired,
  tempColor: PropTypes.string.isRequired,
  currentIconOptions: PropTypes.objectOf(PropTypes.string).isRequired
};

export default CurrentWeatherDisplay;
