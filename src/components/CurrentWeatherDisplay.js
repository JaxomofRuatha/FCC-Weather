import React from 'react';
import PropTypes from 'prop-types';
import WeatherSummary from './WeatherSummary';
import TempRange from './TempRange';

const CurrentWeatherDisplay = ({
  currentWeather,
  tempRange,
  handleUnitSwitch,
  tempColor,
  degreeSymbol
}) => (
  <React.Fragment>
    <WeatherSummary
      currentIconOptions={currentWeather.icon}
      currentWeather={currentWeather}
      handleUnitSwitch={handleUnitSwitch}
      tempColor={tempColor}
      degreeSymbol={degreeSymbol}
      tempRange={tempRange}
    />
    <section className="info-divider">
      <span>
        {`Wind: ${currentWeather.wind.value} ${
          currentWeather.wind.units
        } | Humidity: ${Math.floor(currentWeather.humidity * 100)}% | Visibility: ${currentWeather.visibility.value} ${
          currentWeather.visibility.units
        }`}
      </span>
      <span>{currentWeather.dayForecast}</span>
    </section>
  </React.Fragment>
);

export default CurrentWeatherDisplay;
