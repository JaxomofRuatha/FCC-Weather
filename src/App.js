import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import 'normalize.css';
import './css/style.css';

import * as api from './lib/api';
import { fromMetricTemp } from './utils/unit-converters';
import toggleUnits from './lib/toggle-units';

import TitleTime from './components/TitleTime';
import LocationSelect from './components/LocationSelect';
import CurrentWeatherDisplay from './components/CurrentWeatherDisplay';
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
    } else if (this.props.newCoords) {
      // User has selected a location.
      this.setCoords(this.props.newCoords);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.local) {
      // User is going to local forecast and component mounted.
      api.fetchLocalCoords().then((coords) => {
        this.setCoords(coords);
      });
    } else if (nextProps.newCoords) {
      // User has selected a location.
      this.setCoords(this.props.newCoords);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const updatedCoords = this.state.currentCoords;

    // Run a forecast data update if coordinates change.
    if (prevState.currentCoords !== updatedCoords) {
      this._updateWeather(updatedCoords);
    }
  }

  setCoords = (coords) => {
    this.setState({ currentCoords: coords, fetching: true });
  };

  _updateWeather = async (coords) => {
    // Run API calls with coordinates updated.
    const forecast = await api.fetchForecast(coords);
    const location = await api.fetchReverseGeolocation(coords);

    forecast.current.location = location;

    if (this.props.handleSearch) {
      this.props.handleSearch(this.state.currentCoords);
    }

    this.setState(Object.assign({}, forecast, { fetching: false }));
  };

  handleFormInput = (location) => {
    this.setState({ formLocation: location });
  };

  handleLocationChange = (e) => {
    e.preventDefault();

    // Use built-in AutoComplete method to update forecast.
    geocodeByAddress(this.state.formLocation)
      .then(results => getLatLng(results[0]))
      .then(coords => this.setCoords(coords))
      .catch((err) => {
        throw err;
      });
  };

  handleUnitSwitch = () => {
    const {
      current, tempRange, weekWeather, siUnits
    } = this.state;
    this.setState(toggleUnits(current, tempRange, weekWeather, siUnits));
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

    const background =
      this.state.current.icon === undefined || this.state.fetching
        ? null
        : {
          background: `url(${
            this.state.current.icon.background
          }) no-repeat center center fixed`,
          backgroundSize: 'cover'
        };

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
            setCoords={this.setCoords}
          />
        )}
        {!this.props.root &&
          !this.state.fetching &&
          this.state.current.temp && (
            <React.Fragment>
              <TitleTime currentLocation={this.state.current.location} />
              <CurrentWeatherDisplay
                currentWeather={this.state.current}
                tempRange={this.state.tempRange}
                tempColor={currentTempColor}
                handleUnitSwitch={this.handleUnitSwitch}
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
