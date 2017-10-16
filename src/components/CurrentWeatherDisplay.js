import React from 'react';
import PropTypes from 'prop-types';
import ReactAnimatedWeather from 'react-animated-weather';

const CurrentWeatherDisplay = ({ currentWeather, tempColor, currentIconOptions }) => (
  <div>
    <div id="weather-summary">
      <div className="icon-temp">
        <ReactAnimatedWeather color={currentIconOptions.color} icon={currentIconOptions.icon} size={150} animate />
      </div>
      <h1 id="quick-sum">{currentWeather.currentSummary}</h1>
      <div className="icon-temp" style={{ color: tempColor }}>
        <h1>{Math.round(currentWeather.currentTemp)}&#8457;</h1>
        <div>
          <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" defaultChecked />
          <label className="onoffswitch-label" htmlFor="myonoffswitch">
            <span className="onoffswitch-inner" />
            <span className="onoffswitch-switch" />
          </label>
        </div>
      </div>
    </div>
    <div id="weather-lower">
      <span>
          Wind: &nbsp;{currentWeather.currentWind} mph &nbsp;|&nbsp;
          Humidity: &nbsp;{currentWeather.currentHumidity * 100}% &nbsp;|&nbsp;
          Visibility: &nbsp;{currentWeather.currentVisibility} miles
      </span>
      <span>{currentWeather.currentDaySummary}</span>
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
