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
    document.body.style.background = `url(${
      this.props.current.icon.background
    }) no-repeat center center fixed cover`;
  }

  render() {
    return (
      <div className="weather-box-display">
        <CurrentWeatherDisplay
          currentWeather={this.props.currentWeather}
          tempRange={this.props.tempRange}
          tempColor={this.props.tempColor}
          currentIconOptions={this.props.current.icon}
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
  tempColor: PropTypes.string,
  handleUnitSwitch: PropTypes.func.isRequired
};

CurrentWeatherContainer.defaultProps = {
  current: {
    icon: {}
  },
  tempColor: '#00229E'
};

export default CurrentWeatherContainer;
