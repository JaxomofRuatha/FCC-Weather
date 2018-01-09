import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CurrentWeatherDisplay from '../components/CurrentWeatherDisplay';
import WeekDisplay from '../components/WeekDisplay';

class CurrentWeatherContainer extends Component {
  componentDidMount() {
    if (this.props.handleLocal) {
      this.props.handleLocal();
    } else if (this.props.coords) {
      const { lat, lng } = this.props.coords;
      this.props.getForecast(lat, lng);
      this.props.getReverseGeolocation(lat, lng);
    }
  }

  render() {
    return (
      <div className="weather-box-display">
        <CurrentWeatherDisplay
          currentWeather={this.props.currentWeather}
          tempRange={this.props.tempRange}
          tempColor={this.props.tempColor}
          currentIconOptions={this.props.currentIconOptions}
          handleUnitSwitch={this.props.handleUnitSwitch}
        />
        <WeekDisplay weekWeather={this.props.weekWeather} />
        <Link to="/" className="location-link">
          Change current location
        </Link>
      </div>
    );
  }
}

CurrentWeatherContainer.propTypes = {
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
  handleUnitSwitch: PropTypes.func.isRequired
};

CurrentWeatherContainer.defaultProps = {
  tempColor: '#00229E',
  currentIconOptions: {
    icon: 'CLEAR_NIGHT',
    color: '#FFFFFF',
    background: ''
  }
};

export default CurrentWeatherContainer;
