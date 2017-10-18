import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';

import CurrentWeatherDisplay from './CurrentWeatherDisplay';
import WeekDisplay from './WeekDisplay';


const WeatherBoxDisplay = props => (
  <div className="weather-box-display">
    <CurrentWeatherDisplay
      currentWeather={props.currentWeather}
      tempColor={props.tempColor}
      currentIconOptions={props.currentIconOptions}
      handleTempSwitch={props.handleTempSwitch}
    />
    <WeekDisplay weekWeather={props.weekWeather}/>
    <form className="flex-cent-row" onSubmit={props.handleLocationChange}>
      <PlacesAutocomplete
        inputProps={props.inputProps}
        styles={{
          autocompleteContainer: { height: '90%' }
        }}
      />
      <button type="submit">Go there!</button>
    </form>
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
  handleLocationChange: PropTypes.func.isRequired,
  handleTempSwitch: PropTypes.func.isRequired
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
