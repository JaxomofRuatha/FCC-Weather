import React from 'react';
import PropTypes from 'prop-types';
import WeatherSummary from './WeatherSummary';
import TempRange from './TempRange';

const CurrentWeatherDisplay = ({
  currentWeather,
  currentIconOptions,
  tempRange,
  handleUnitSwitch,
  tempColor
}) => (
  <React.Fragment>
    <WeatherSummary
      currentIconOptions={currentIconOptions}
      currentWeather={currentWeather}
      handleUnitSwitch={handleUnitSwitch}
      tempColor={tempColor}
    />
    <TempRange tempRange={tempRange} />
    <section className="info-divider">
      <span>
        {`Wind: ${currentWeather.wind} | Humidity: ${Math.floor(currentWeather.humidity * 100)}% | Visibility: ${currentWeather.visibility}`}
      </span>
      <span>{currentWeather.dayForecast}</span>
    </section>
  </React.Fragment>
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
