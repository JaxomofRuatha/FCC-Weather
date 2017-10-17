import React, { Component } from 'react';
import moment from 'moment';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import 'normalize.css';
import './css/style.css';

import WeatherBoxDisplay from './components/WeatherBoxDisplay';

import apiSkeleton from './utils/api-helpers';
import iconOptions from './utils/icon-options';

const apiOpts = {
  cache: 'default',
  dataType: 'jsonp',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  method: 'GET',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: '',
      formLocation: '',
      currentTemp: '',
      currentSummary: '',
      currentDaySummary: '',
      currentWind: '',
      currentHumidity: '',
      currentVisibility: '',
      currentIcon: '',
      currentIconOptions: {
        icon: 'CLEAR_DAY',
        color: '',
        background: ''
      },
      urlOpts: {}
    };
  }

  componentDidMount() {
    // If browser geolocation is enabled, set coordinates in state.

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this._getForecast(
            position.coords.latitude,
            position.coords.longitude
          );

          this._getReverseGeolocation(
            position.coords.latitude,
            position.coords.longitude
          );
        },

        // If geolocation fails, query ipinfo.io

        () => {
          fetch('https://ipinfo.io/geo', apiOpts)
            .then(res => res.json())
            .then((res) => {
              const location = res.loc.split(',');
              this._getForecast(location[0], location[1]);
            });
        }
      );
    }
  }

  _getForecast = (latitude, longitude, urlOpts) => {
    const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/86c75ecb51f9869d11c2dcfb869d069a/${latitude},${longitude}?${this.state.urlOpts.units}`;

    apiSkeleton(url, apiOpts, this._onForecastSuccess, this._onForecastFail);
  };

  _onForecastSuccess = (res) => {
    const currentTemp = res.currently.temperature;
    const currentSummary = res.currently.summary;
    const currentDaySummary = res.hourly.summary;
    const currentWind = res.currently.windSpeed;
    const currentHumidity = res.currently.humidity;
    const currentVisibility = res.currently.visibility;
    const currentIcon = res.currently.icon;

    this.setState(
      {
        currentTemp,
        currentSummary,
        currentDaySummary,
        currentWind,
        currentHumidity,
        currentVisibility,
        currentIcon
      },
      this._handleWeatherUpdate(currentIcon)
    );
  };

  _onForecastFail = (err) => {
    // TODO: New error handling!
  };

  _getReverseGeolocation = (latitude, longitude) => {
    const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB2mV9wU6kQ4pTU-MFS1vUSRaAilCXorxA`;

    apiSkeleton(
      url,
      apiOpts,
      this._onReverseGeolocationSuccess,
      this._onReverseGeolocationFail
    );
  };

  _onReverseGeolocationSuccess = (response) => {
    const currentLocation = response.results[2].formatted_address;

    this.setState({
      currentLocation
    });
  };

  _onReverseGeolocationFail = (err) => {
    // TODO: New error handling!
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
        this._getForecast(coords.lat, coords.lng);
        this._getReverseGeolocation(coords.lat, coords.lng);
      })
      .catch(err => console.error(err));
  };

  _handleTempSwitch = (e) => {
    // Change all units to SI call from API
    console.log(e.target);
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
      if (temp <= 32) {
        return '#00229E';
      } else if (temp <= 60) {
        return '#1CF20C';
      } else if (temp <= 80) {
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
        <div className="title-time">
          <span>{`${moment().format('MMMM')} ${moment().format('Do')}, ${moment().format('YYYY')}`}
          </span>
          <h1>{this.state.currentLocation}</h1>
          <span>{moment().format('hh:mm A')}</span>
        </div>
        <WeatherBoxDisplay
          currentWeather={currentWeather}
          tempColor={currentTempColor}
          currentIconOptions={this.state.currentIconOptions}
          handleLocationChange={this._handleLocationChange}
          handleTempSwitch={this._handleTempSwitch}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default App;
