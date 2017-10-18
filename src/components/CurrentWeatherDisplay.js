import React from 'react';
import PropTypes from 'prop-types';
import ReactAnimatedWeather from 'react-animated-weather';

const CurrentWeatherDisplay = props => (
  <div>
    <div className="flex-cent-row weather-summary">
      <div className="icon-temp">
        <ReactAnimatedWeather
          color={props.currentIconOptions.color}
          icon={props.currentIconOptions.icon}
          size={150}
          animate
        />
      </div>
      <div className="flex-cent-col weather-summary-title">
        <h1>{props.currentWeather.currentSummary}</h1>
        <div className="flex-cent-row">
          <div className="flex-cent-col">
            <span style={{ color: 'darkblue' }}>0</span>
            <span className="temp-label">Low</span>
          </div>
          <div className="temp-gauge" />
          <div className="flex-cent-col">
            <span style={{ color: 'darkred' }}>100</span>
            <span className="temp-label">High</span>
          </div>
        </div>
      </div>
      <div className="icon-temp" style={{ color: props.tempColor }}>
        <h1>
          {Math.round(props.currentWeather.currentTemp)}
          <sup>&#8457;</sup>
        </h1>
      </div>
    </div>
    <div className="weather-lower">
      <span>
        Wind: &nbsp;{props.currentWeather.currentWind} mph &nbsp;|&nbsp;
        Humidity: &nbsp;{props.currentWeather.currentHumidity * 100}%
        &nbsp;|&nbsp; Visibility: &nbsp;{props.currentWeather.currentVisibility}{' '}
        miles
      </span>
      <span>{props.currentWeather.currentDaySummary}</span>
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
