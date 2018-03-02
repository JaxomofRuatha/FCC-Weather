import React from 'react';
import PropTypes from 'prop-types';
import ReactAnimatedWeather from 'react-animated-weather';

const WeatherSummary = props => (
  <section className="weather-summary">
    {props.currentIconOptions && (
      <figure className="icon-temp">
        <ReactAnimatedWeather
          className="weather-summary__icon"
          color={props.currentIconOptions.color}
          icon={props.currentIconOptions.icon}
          size={150}
          animate
        />
      </figure>
    )}
    <h1 className="weather-summary__desc">{props.currentWeather.summary}</h1>
    <article
      className="icon-temp weather-summary__temp"
      style={{ color: props.tempColor }}
    >
      <h1>
        {Math.round(props.currentWeather.temp)}
        <sup>&#8457;</sup>
      </h1>
      <button
        className="weather-summary__units"
        onClick={props.handleUnitSwitch}
      >
        &#8457; / &#8451;
      </button>
    </article>
  </section>
);

export default WeatherSummary;
