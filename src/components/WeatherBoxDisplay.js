import React from 'react';
import PropTypes from 'prop-types';

import CurrentWeatherDisplay from './CurrentWeatherDisplay';
import SearchLocationDisplay from './SearchLocationDisplay';

const WeatherBoxDisplay = props => (
  <div id="weather-box-display">
    <CurrentWeatherDisplay
      currentWeather={props.currentWeather}
      tempColor={props.tempColor}
      currentIconOptions={props.currentIconOptions}
    />
    <SearchLocationDisplay />
  </div>
);

WeatherBoxDisplay.propTypes = {
  currentWeather: PropTypes.objectOf(PropTypes.string),
  tempColor: PropTypes.string,
  currentIconOptions: PropTypes.objectOf(PropTypes.string)
};

WeatherBoxDisplay.defaultProps = {
  currentWeather: {
    currentTemp: '0',
    currentSummary: 'Loading...',
    currentDaySummary: 'Loading...',
    currentWind: '...',
    currentHumidity: '...',
    currentVisibility: '...',
    currentIcon: 'clear-night'
  },
  tempColor: '#00229E',
  currentIconOptions: {
    icon: 'CLEAR_NIGHT',
    color: '#FFFFFF',
    background: ''
  }
};

export default WeatherBoxDisplay;
