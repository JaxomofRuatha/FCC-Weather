import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CurrentWeatherDisplay from '../components/CurrentWeatherDisplay';
import WeekDisplay from '../components/WeekDisplay';

import { fetchLocalCoords } from '../lib/api';

class CurrentWeatherContainer extends Component {
  componentDidMount() {
    if (this.props.newCoords) {
      this.props.setCoords(this.props.newCoords);
    } else {
      fetchLocalCoords().then((newCoords) => {
        this.props.setCoords(newCoords);
      });
    }
  }

  render() {
    return (
      <main className="weather-display">
        <CurrentWeatherDisplay
          currentWeather={this.props.currentWeather}
          tempRange={this.props.tempRange}
          tempColor={this.props.tempColor}
          currentIconOptions={this.props.currentWeather.icon}
          handleUnitSwitch={this.props.handleUnitSwitch}
        />
        <WeekDisplay weekWeather={this.props.weekWeather} />
        <Link to="/" className="info-divider">
          Change current location
        </Link>
      </main>
    );
  }
}

CurrentWeatherContainer.propTypes = {
  handleUnitSwitch: PropTypes.func.isRequired
};

export default CurrentWeatherContainer;
