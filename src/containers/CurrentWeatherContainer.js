import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CurrentWeatherDisplay from '../components/CurrentWeatherDisplay';
import WeekDisplay from '../components/WeekDisplay';

class CurrentWeatherContainer extends Component {
  componentDidMount() {
    if (this.props.handleLocal) {
      this.props.handleLocal();
    }
    if (this.props.newCoords) {
      this.props.setCoords(this.props.newCoords.lat, this.props.newCoords.lng);
    }
    if (this.props.currentCoords) {
      const { lat, lng } = this.props.currentCoords;
      this.props.getForecast(lat, lng);
      this.props.getReverseGeolocation(lat, lng);
    }
  }

  componentDidUpdate() {
    if (this.props.currentWeather.icon) {
      console.log(this.props.currentWeather.icon);
      document.body.style.background = `url(${
        this.props.currentWeather.icon.background
      }) no-repeat center center fixed cover`;
    }
  }

  componentWillUnmount() {
    document.body.style.background = '#020131';
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
