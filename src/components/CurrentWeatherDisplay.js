import React from 'react';
import PropTypes from 'prop-types';
import ReactAnimatedWeather from 'react-animated-weather';

const CurrentWeatherDisplay = ({ currentWeather, tempColor, currentIconOptions }) => (
  <div>
    <div id="weather-summary">
      <div id="weather-icon">
        <ReactAnimatedWeather color={currentIconOptions.color} icon={currentIconOptions.icon} size={150} animate />
      </div>
      <h1 id="quick-sum">{currentWeather.currentSummary}</h1>
      <div id="temp" style={{ color: tempColor }}>
        <h1>{Math.round(currentWeather.currentTemp)}&#8457;</h1>
      </div>
    </div>
    <div id="weather-lower">
      <div id="weather-misc">
        <p>
            Wind: &nbsp;{currentWeather.currentWind} mph &nbsp;|&nbsp;
            Humidity: &nbsp;{currentWeather.currentHumidity * 100}% &nbsp;|&nbsp;
            Visibility: &nbsp;{currentWeather.currentVisibility} miles
        </p>
      </div>
      <div>
        <p>{currentWeather.currentDaySummary}</p>
      </div>
    </div>
  </div>
);

CurrentWeatherDisplay.propTypes = {
  currentWeather: PropTypes.objectOf(PropTypes.string).isRequired,
  tempColor: PropTypes.string.isRequired,
  currentIconOptions: PropTypes.objectOf(PropTypes.string).isRequired
};

export default CurrentWeatherDisplay;
