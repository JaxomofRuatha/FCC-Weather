import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { geocodeByAddress } from 'react-places-autocomplete';

import 'normalize.css';
import './css/style.css';

import * as api from './lib/api';
import { fromMetricTemp } from './utils/unit-converters';
import toggleUnits from './lib/toggle-units';

import TitleTime from './components/TitleTime';
import LocationSelect from './components/LocationSelect';
import WeatherSummary from './components/WeatherSummary';
import WeekDisplay from './components/WeekDisplay';
import LoadingScreen from './components/LoadingScreen';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {},
      siUnits: false,
      fetching: false
    };
  }

  componentDidMount() {
    if (this.props.local) {
      // User is going to local forecast.
      api.fetchLocalCoords().then((coords) => {
        this.setCoords(coords);
      });
    } else if (this.props.newCoords !== this.state.currentCoords) {
      // User has selected a location.
      this.setCoords(this.props.newCoords);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.local && !this.state.currentCoords) {
      // User is going to local forecast and component mounted.
      api.fetchLocalCoords().then((coords) => {
        this.setCoords(coords);
      });
    } else if (nextProps.newCoords !== this.state.currentCoords) {
      // User has selected a location.
      this.setCoords(this.props.newCoords);
    }

    if (nextProps.root && this.state.siUnits) {
      this.setState({ siUnits: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const updatedCoords = this.state.currentCoords;

    // Run a forecast data update if coordinates change.
    if (prevState.currentCoords !== updatedCoords && updatedCoords) {
      this._updateWeather(updatedCoords);
    }
  }

  setCoords = (coords) => {
    this.setState({ currentCoords: coords });
  };

  _updateWeather = async (coords) => {
    this.setState({ fetching: true });

    // Run API calls with coordinates updated.
    const forecast = await api.fetchForecast(coords);
    const location = await api.fetchReverseGeolocation(coords);

    forecast.current.location = location;

    this.setState(Object.assign({}, forecast, { fetching: false }));
  };

  handleFormInput = (location) => {
    this.setState({ formLocation: location });
  };

  handleLocationChange = async (e) => {
    e.preventDefault();

    // Use built-in AutoComplete method to update forecast.
    const geocodeRes = await geocodeByAddress(this.state.formLocation);
    const coords = {
      lat: geocodeRes[0].geometry.location.lat(),
      lng: geocodeRes[0].geometry.location.lng()
    };

    this.props.handleSearch(coords);
    this.setCoords(coords);
  };

  handleUnitSwitch = (e) => {
    e.preventDefault();

    const {
      current, tempRange, weekWeather, siUnits
    } = this.state;
    const newState = toggleUnits(current, tempRange, weekWeather, siUnits);
    this.setState(newState);
  };

  render() {
    // Determine the color of the current temperature based on the range.

    const tempColor = (temp) => {
      let orig = temp;

      if (this.state.siUnits) {
        orig = fromMetricTemp(orig);
      }
      if (orig <= 32) {
        return '#56FFBE';
      } else if (orig <= 60) {
        return '#1CF20C';
      } else if (orig <= 80) {
        return '#EBA713';
      }
      return '#f26b18';
    };

    const currentTempColor = tempColor(this.state.current.temp);

    // Feed information into the AutoComplete component from user input.

    const inputProps = {
      value: this.state.formLocation,
      onChange: this.handleFormInput,
      placeholder: 'Check out the weather for a different location!'
    };

    // Determine the background image to use from the icon options

    const background =
      this.state.current.icon === undefined || this.state.fetching
        ? null
        : {
          background: `url(${
            this.state.current.icon.background
          }) no-repeat center center fixed`,
          backgroundSize: 'cover'
        };

    const degreeSymbol = this.state.siUnits ? '℃' : '℉';

    return (
      <main
        className="forecast-app"
        style={
          !background || this.props.root
            ? { background: '#020131' }
            : background
        }
      >
        {this.state.fetching && <LoadingScreen />}
        {this.props.root && (
          <LocationSelect
            handleLocationChange={this.handleLocationChange}
            inputProps={inputProps}
          />
        )}
        {!this.props.root &&
          !this.state.fetching &&
          this.state.current.temp && (
            <React.Fragment>
              <TitleTime currentLocation={this.state.current.location} />
              <WeatherSummary
                currentWeather={this.state.current}
                tempRange={this.state.tempRange}
                tempColor={currentTempColor}
                handleUnitSwitch={this.handleUnitSwitch}
                degreeSymbol={degreeSymbol}
                currentIconOptions={this.state.current.icon}
              />
              <WeekDisplay weekWeather={this.state.weekWeather} />
              <Link to="/" className="info-divider">
                Change current location
              </Link>
            </React.Fragment>
          )}
      </main>
    );
  }
}

App.propTypes = {
  root: PropTypes.bool,
  local: PropTypes.bool,
  newCoords: PropTypes.objectOf(PropTypes.number),
  handleSearch: PropTypes.func
};

App.defaultProps = {
  root: false,
  local: false,
  newCoords: null,
  handleSearch: null
};

export default App;
