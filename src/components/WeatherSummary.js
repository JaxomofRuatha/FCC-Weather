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
        <sup id="deg-unit">&#8457;</sup>
      </h1>
      <div className="weather-summary__switch" onClick={props.handleUnitSwitch}>
        <input
          type="checkbox"
          className="weather-summary__checkbox"
          id="weather-summary__checkbox"
          checked
        />
        <label
          className="weather-summary__toggle"
          htmlFor="weather-summary__checkbox"
        >
          <span className="weather-summary__toggle-inner" />
          <span className="weather-summary__toggle-switch" />
        </label>
      </div>
    </article>
  </section>
);

export default WeatherSummary;
