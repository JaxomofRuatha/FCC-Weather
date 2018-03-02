import React from 'react';
import PropTypes from 'prop-types';
import ReactAnimatedWeather from 'react-animated-weather';

const WeatherSummary = props => (
  <div>
    <ReactAnimatedWeather
      color={props.currentIconOptions.color}
      icon={props.currentIconOptions.icon}
      size={150}
      animate
    />
    <h1>{props.currentWeather.currentSummary}</h1>
    <div className="icon-temp" style={{ color: props.tempColor }}>
      <h1>
        {Math.round(props.currentWeather.currentTemp)}
        <sup id="deg-unit" onClick={props.handleUnitSwitch}>
          &#8457;
        </sup>
      </h1>
    </div>
  </div>
);

export default WeatherSummary;
