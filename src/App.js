import React, { Component } from 'react';
import moment from 'moment';
import { Switch, Route, withRouter } from 'react-router-dom';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import 'normalize.css';
import './css/style.css';

import WeatherBoxDisplay from './components/WeatherBoxDisplay';
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
  dataType: 'jsonp',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  method: 'GET'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTemp: '',
      tempRange: [],
      weekWeather: [],
      currentVisibility: {
        value: 0,
        units: 'miles'
      },
      currentWind: {
        value: 0,
        units: 'mph'
      },
      currentCoords: {},
      currentLocation: '',
      formLocation: '',
      currentSummary: '',
      currentDaySummary: '',
      currentHumidity: '',
      currentIcon: '',
      currentIconOptions: {
        icon: 'CLEAR_DAY',
        color: '',
        background: ''
      },
      siUnits: false
    };
  }

  _getLocalCoords = () => {
    // If browser geolocation is enabled, set coordinates in state.

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          this._getForecast(lat, lng);
          this._getReverseGeolocation(lat, lng);

          this.setState({ currentCoords: { lat, lng } });
        },

        // If geolocation fails, query ipinfo.io

        () => {
          fetch('https://ipinfo.io/geo', apiOpts)
            .then(res => res.json())
            .then((res) => {
              const location = res.loc.split(',');
              this._getForecast(location[0], location[1]);
              this.setState({
                currentCoords: { lat: location[0], lng: location[1] }
              });
            });
        }
      );
    }
  };

  _getForecast = (lat, lng) => {
    const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/86c75ecb51f9869d11c2dcfb869d069a/${lat},${lng}`;

    apiSkeleton(url, apiOpts, this._onForecastSuccess, this._onForecastFail);
  };

  _onForecastSuccess = (res) => {
    const weekWeather = [];

    for (let i = 1; i < 7; i++) {
      weekWeather.push({
        day: moment.unix(res.daily.data[i].time).format('ddd DD'),
        high: res.daily.data[i].temperatureHigh,
        low: res.daily.data[i].temperatureLow,
        icon: iconOptions(res.daily.data[i].icon)
      });
    }

    this.setState(
      {
        currentTemp: res.currently.temperature,
        currentSummary: res.currently.summary,
        currentDaySummary: res.hourly.summary,
        currentWind: {
          value: res.currently.windSpeed,
          units: 'mph'
        },
        currentHumidity: res.currently.humidity,
        currentVisibility: {
          value: res.currently.visibility,
          units: 'miles'
        },
        currentIcon: res.currently.icon,
        tempRange: [
          Math.floor(res.daily.data[0].temperatureLow),
          Math.floor(res.daily.data[0].temperatureHigh)
        ],
        weekWeather
      },
      this._handleWeatherUpdate(res.currently.icon)
    );
  };

  _onForecastFail = (err) => {
    throw err;
  };

  _getReverseGeolocation = (lat, lng) => {
    const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB2mV9wU6kQ4pTU-MFS1vUSRaAilCXorxA`;

    apiSkeleton(
      url,
      apiOpts,
      this._onReverseGeolocationSuccess,
      this._onReverseGeolocationFail
    );
  };

  _onReverseGeolocationSuccess = (res) => {
    const currentLocation = res.results[2].formatted_address;

    this.setState({
      currentLocation
    });
  };

  _onReverseGeolocationFail = (err) => {
    throw err;
  };

  _handleWeatherUpdate = (currentIcon) => {
    this.setState(
      {
        currentIconOptions: iconOptions(currentIcon)
      },
      () => {
        document.body.style.background = `url(${this.state.currentIconOptions
          .background}) no-repeat center center fixed`;
        document.body.style.backgroundSize = 'cover';
      }
    );
  };

  _handleFormInput = (location) => {
    this.setState({ formLocation: location });
  };

  _handleLocationChange = (e) => {
    e.preventDefault();

    geocodeByAddress(this.state.formLocation)
      .then(results => getLatLng(results[0]))
      .then((coords) => {
        this.setState(
          {
            currentCoords: {
              lat: coords.lat,
              lng: coords.lng
            }
          },
          () => {
            const { lat } = this.state.currentCoords;
            const { lng } = this.state.currentCoords;
            this._getForecast(lat, lng);
            this._getReverseGeolocation(lat, lng);
            this.props.history.push(`./${lat},${lng}`);
          }
        );
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

    if (this.state.siUnits === false) {
      document.getElementById('deg-unit').innerHTML = '&#8451;';

      this.setState({
        currentTemp: toMetricTemp(this.state.currentTemp),
        tempRange: toMetricTemp(this.state.tempRange),
        weekWeather: weekHelper(this.state.weekWeather, toMetricTemp),
        currentVisibility: {
          value: toMetricDist(this.state.currentVisibility.value),
          units: 'kilometers'
        },
        currentWind: {
          value: toMetricDist(this.state.currentWind.value),
          units: 'kph'
        },
        siUnits: true
      });
    } else {
      document.getElementById('deg-unit').innerHTML = '&#8457;';

      this.setState({
        currentTemp: fromMetricTemp(this.state.currentTemp),
        tempRange: fromMetricTemp(this.state.tempRange),
        weekWeather: weekHelper(this.state.weekWeather, fromMetricTemp),
        currentVisibility: {
          value: fromMetricDist(this.state.currentVisibility.value),
          units: 'miles'
        },
        currentWind: {
          value: fromMetricDist(this.state.currentWind.value),
          units: 'mph'
        },
        siUnits: false
      });
    }
  };

  render() {
    const currentWeather = {
      currentTemp: this.state.currentTemp,
      currentSummary: this.state.currentSummary,
      currentDaySummary: this.state.currentDaySummary,
      currentWind: this.state.currentWind,
      currentHumidity: this.state.currentHumidity,
      currentVisibility: this.state.currentVisibility,
      currentIcon: this.state.currentIcon
    };

    const tempColor = (temp) => {
      let orig = temp;

      if (this.state.siUnits) {
        orig = fromMetricTemp(orig);
      }
      if (orig <= 32) {
        return '#00229E';
      } else if (orig <= 60) {
        return '#1CF20C';
      } else if (orig <= 80) {
        return '#EBA713';
      }
      return '#f26b18';
    };

    const currentTempColor = tempColor(this.state.currentTemp);

    const inputProps = {
      value: this.state.formLocation,
      onChange: this._handleFormInput,
      placeholder: 'Check out the weather for a different location!'
    };

    return (
      <div className="app-container">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <LocationSelect
                getLocalCoords={this._getLocalCoords}
                handleLocationChange={this._handleLocationChange}
                inputProps={inputProps}
                currentCoords={this.state.currentCoords}
              />
            )}
          />
          <Route
            exact
            path="/local"
            render={() => (
              <div className="main-wrapper">
                <TitleTime currentLocation={this.state.currentLocation} />
                <WeatherBoxDisplay
                  currentWeather={currentWeather}
                  tempRange={this.state.tempRange}
                  weekWeather={this.state.weekWeather}
                  tempColor={currentTempColor}
                  currentIconOptions={this.state.currentIconOptions}
                  handleUnitSwitch={this._handleUnitSwitch}
                />
              </div>
              )
            }
          />
          <Route
            exact
            path="/:locationId"
            render={({ match }) => {
              const newCoords = {
                lat: match.params.locationId.split(',')[0],
                lng: match.params.locationId.split(',')[1]
              };
              this.setState({ currentCoords: newCoords });
              return (
                <div className="main-wrapper">
                  <TitleTime currentLocation={this.state.currentLocation} />
                  <WeatherBoxDisplay
                    currentWeather={currentWeather}
                    tempRange={this.state.tempRange}
                    weekWeather={this.state.weekWeather}
                    tempColor={currentTempColor}
                    currentIconOptions={this.state.currentIconOptions}
                    handleUnitSwitch={this._handleUnitSwitch}
                  />
                </div>
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
