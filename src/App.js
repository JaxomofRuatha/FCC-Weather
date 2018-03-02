import React, { Component } from 'react';
import moment from 'moment';
import { Switch, Route, withRouter } from 'react-router-dom';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import 'normalize.css';
import './css/style.css';

import CurrentWeatherContainer from './containers/CurrentWeatherContainer';
import TitleTime from './components/TitleTime';
import LocationSelect from './components/LocationSelect';

import apiSkeleton from './utils/api-helpers';
import iconOptions from './utils/icon-options';
import {
  toMetricTemp,
  fromMetricTemp,
  toMetricDist,
  fromMetricDist
} from './utils/unit-converters';

const apiOpts = {
  cache: 'default',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  method: 'GET'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {},
      siUnits: false
    };
  }

  _setCoords = (lat, lng, handler) => {
    this.setState({ currentCoords: { lat, lng } }, () => {
      this._getForecast(lat, lng);
      this._getReverseGeolocation(lat, lng);
      if (handler) {
        handler();
      }
    });
  };

  _getLocalCoords = () => {
    // If browser geolocation is enabled, set coordinates in state.

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          this._setCoords(lat, lng);
        },

        // If geolocation fails, query ipinfo.io to set the coordinates in state instead

        () => {
          fetch('https://ipinfo.io/geo', apiOpts).then((res) => {
            const location = res.loc.split(',');

            this._setCoords(location[0], location[1]);
          });
        }
      );
    }
  };

  _getForecast = (lat, lng) => {
    const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/86c75ecb51f9869d11c2dcfb869d069a/${lat},${lng}`;

    apiSkeleton(url, apiOpts)
      .then((res) => {
        const weekWeather = [];

        // Populate data for the 7-day forecast in an array.
        for (let i = 1; i < 7; i++) {
          weekWeather.push({
            day: moment.unix(res.daily.data[i].time).format('ddd DD'),
            high: res.daily.data[i].temperatureHigh,
            low: res.daily.data[i].temperatureLow,
            icon: iconOptions(res.daily.data[i].icon)
          });
        }

        this.setState({
          current: Object.assign({}, this.state.current, {
            temp: res.currently.temperature,
            summary: res.currently.summary,
            dayForecast: res.hourly.summary,
            wind: `${res.currently.windSpeed} mph`,
            humidity: res.currently.humidity,
            visibility: `${res.currently.visibility} mi`,
            icon: iconOptions(res.currently.icon)
          }),
          tempRange: [
            Math.floor(res.daily.data[0].temperatureLow),
            Math.floor(res.daily.data[0].temperatureHigh)
          ],
          weekWeather
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  _getReverseGeolocation = (lat, lng) => {
    const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB2mV9wU6kQ4pTU-MFS1vUSRaAilCXorxA`;

    apiSkeleton(url, apiOpts)
      .then((res) => {
        const currentLocation = res.results[2].formatted_address;

        this.setState({
          current: Object.assign({}, this.state.current, {
            location: currentLocation
          })
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  _handleFormInput = (location) => {
    this.setState({ formLocation: location });
  };

  _handleLocationChange = (e) => {
    e.preventDefault();

    // Use built-in AutoComplete method to update forecast.
    geocodeByAddress(this.state.formLocation)
      .then(results => getLatLng(results[0]))
      .then((coords) => {
        this._setCoords(coords.lat, coords.lng, () => {
          const { lat, lng } = this.state.currentCoords;
          this.props.history.push(`./${lat},${lng}`);
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  _handleUnitSwitch = () => {
    function weekHelper(week, converter) {
      return week.map(day => ({
        day: day.day,
        high: converter(day.high),
        low: converter(day.low),
        icon: day.icon
      }));
    }

    const windValue = this.state.current.wind.slice(0, -4);
    const visValue = this.state.current.visibility.slice(0, -3);

    if (this.state.siUnits === false) {
      document.getElementById('deg-unit').innerHTML = '&#8451;';

      this.setState({
        current: Object.assign({}, this.state.current, {
          temp: toMetricTemp(this.state.currentTemp),
          wind: `${toMetricDist(Number(windValue))} kph`,
          visibility: `${toMetricDist(Number(visValue))} km`
        }),
        tempRange: toMetricTemp(this.state.tempRange),
        weekWeather: weekHelper(this.state.weekWeather, toMetricTemp),
        siUnits: true
      });
    } else {
      document.getElementById('deg-unit').innerHTML = '&#8457;';

      this.setState({
        current: Object.assign({}, this.state.current, {
          temp: fromMetricTemp(this.state.currentTemp),
          wind: `${fromMetricDist(Number(windValue))} mph`,
          visibility: `${fromMetricDist(Number(visValue))} mi`
        }),
        tempRange: fromMetricTemp(this.state.tempRange),
        weekWeather: weekHelper(this.state.weekWeather, fromMetricTemp),
        siUnits: false
      });
    }
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
      onChange: this._handleFormInput,
      placeholder: 'Check out the weather for a different location!'
    };

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <LocationSelect
              getLocalCoords={this._getLocalCoords}
              inputProps={inputProps}
              currentCoords={this.state.currentCoords}
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
                currentWeather={this.state.current}
                tempRange={this.state.tempRange}
                weekWeather={this.state.weekWeather}
                tempColor={currentTempColor}
                handleUnitSwitch={this._handleUnitSwitch}
                handleLocal={this._getLocalCoords}
                currentCoords={this.state.currentCoords}
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
                  setCoords={this._setCoords}
                  currentCoords={this.state.currentCoords}
                  currentWeather={this.state.current}
                  tempRange={this.state.tempRange}
                  weekWeather={this.state.weekWeather}
                  tempColor={currentTempColor}
                  handleUnitSwitch={this._handleUnitSwitch}
                  getForecast={this._getForecast}
                  getReverseGeolocation={this._getReverseGeolocation}
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
