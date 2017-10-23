import React from 'react';
import PropTypes from 'prop-types';

import CurrentWeatherDisplay from './CurrentWeatherDisplay';
import WeekDisplay from './WeekDisplay';


const WeatherBoxDisplay = props => (
  <div className="weather-box-display">
    <CurrentWeatherDisplay
      currentWeather={props.currentWeather}
      tempRange={props.tempRange}
      tempColor={props.tempColor}
      currentIconOptions={props.currentIconOptions}
      handleUnitSwitch={props.handleUnitSwitch}
    />
    <WeekDisplay weekWeather={props.weekWeather} />
    <button>Change current location</button>
  </div>
);

WeatherBoxDisplay.propTypes = {
  currentWeather: PropTypes.shape({
    currentTemp: PropTypes.number,
    currentSummary: PropTypes.string,
    currentDaySummary: PropTypes.string,
    currentWind: PropTypes.string,
    currentHumidity: PropTypes.string,
    currentVisibility: PropTypes.string,
    currentIcon: PropTypes.string
  }).isRequired,
  tempColor: PropTypes.string,
  currentIconOptions: PropTypes.objectOf(PropTypes.string),
  handleUnitSwitch: PropTypes.func.isRequired
};

WeatherBoxDisplay.defaultProps = {
  tempColor: '#00229E',
  currentIconOptions: {
    icon: 'CLEAR_NIGHT',
    color: '#FFFFFF',
    background: ''
  }
};

export default WeatherBoxDisplay;
