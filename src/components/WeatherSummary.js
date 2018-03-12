import React from 'react';
import PropTypes from 'prop-types';
import ReactAnimatedWeather from 'react-animated-weather';
import TempRange from './TempRange';

const WeatherSummary = ({ currentWeather, ...props }) => (
  <section className="weather-summary">
    {props.currentIconOptions && (
      <figure className="icon-temp weather-summary__icon-wrapper">
        <ReactAnimatedWeather
          className="weather-summary__icon"
          color={props.currentIconOptions.color}
          icon={props.currentIconOptions.icon}
          size={150}
          animate
        />
      </figure>
    )}
    <header className="weather-summary__center">
      <h1 className="weather-summary__desc">{currentWeather.summary}</h1>
      <div className="weather-summary__miscinfo">
        <span>
          {`Wind: ${currentWeather.wind.value} ${
            currentWeather.wind.units
          } | Humidity: ${Math.floor(currentWeather.humidity * 100)}% | Visibility: ${currentWeather.visibility.value} ${
            currentWeather.visibility.units
          }`}
        </span>
        <span>{currentWeather.dayForecast}</span>
      </div>
    </header>
    <article
      className="icon-temp weather-summary__temp"
      style={{ color: props.tempColor }}
    >
      <div>
        <h1>
          {Math.round(currentWeather.temp)}
          <sup id="deg-unit">{props.degreeSymbol}</sup>
        </h1>
        <div
          className="weather-summary__switch"
          onClick={props.handleUnitSwitch}
        >
          <input
            type="checkbox"
            className="weather-summary__checkbox"
            id="weather-summary__checkbox"
            defaultChecked
          />
          <label
            className="weather-summary__toggle"
            htmlFor="weather-summary__checkbox"
          >
            <span className="weather-summary__toggle-inner" />
            <span className="weather-summary__toggle-switch" />
          </label>
        </div>
      </div>
      <TempRange tempRange={props.tempRange} />
    </article>
  </section>
);

export default WeatherSummary;
