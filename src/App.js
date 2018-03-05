import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import 'normalize.css';
import './css/style.css';

import CurrentWeatherContainer from './containers/CurrentWeatherContainer';
import TitleTime from './components/TitleTime';
import LocationSelect from './components/LocationSelect';

import * as api from './lib/api';
import { fromMetricTemp } from './utils/unit-converters';
import toggleUnits from './lib/toggle-units';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {},
      siUnits: false,
      fetching: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentCoords !== this.props.currentCoords) {
      this._updateWeather(this.state.currentCoords);
    }
  }

  setCoords = (coords) => {
    this.setState({ currentCoords: coords });
  };

  _updateWeather = async (coords) => {
    const forecast = await api.fetchForecast(coords);
    const location = await api.fetchReverseGeolocation(coords);

    forecast.current.location = location;

    this.setState(forecast);
  };

  handleFormInput = (location) => {
    this.setState({ formLocation: location });
  };

  handleLocationChange = (e) => {
    e.preventDefault();

    // Use built-in AutoComplete method to update forecast.
    geocodeByAddress(this.state.formLocation)
      .then(results => getLatLng(results[0]))
      .then(coords => this._setCoords(coords))
      .catch((err) => {
        throw err;
      });
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

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <LocationSelect
              fetchLocalCoords={api.fetchLocalCoords}
              handleLocationChange={this.handleLocationChange}
              inputProps={inputProps}
              setCoords={this.setCoords}
            />
          )}
        />
        <Route
          exact
          path="/local"
          render={() => (
            <React.Fragment>
              <TitleTime currentLocation={this.state.current.location} />
              <CurrentWeatherContainer
                setCoords={this.setCoords}
                currentWeather={this.state.current}
                tempRange={this.state.tempRange}
                weekWeather={this.state.weekWeather}
                tempColor={currentTempColor}
                handleUnitSwitch={toggleUnits}
              />
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/:locationId"
          render={({ match }) => {
            const newCoords = {
              lat: match.params.locationId.split(',')[0],
              lng: match.params.locationId.split(',')[1]
            };

            return (
              <React.Fragment>
                <TitleTime currentLocation={this.state.current.location} />
                <CurrentWeatherContainer
                  newCoords={newCoords}
                  setCoords={this.setCoords}
                  currentWeather={this.state.current}
                  tempRange={this.state.tempRange}
                  weekWeather={this.state.weekWeather}
                  tempColor={currentTempColor}
                  handleUnitSwitch={toggleUnits}
                />
              </React.Fragment>
            );
          }}
        />
      </Switch>
    );
  }
}

export default withRouter(App);
