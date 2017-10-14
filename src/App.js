import React, { Component } from 'react';
import moment from 'moment';

import 'normalize.css';
import './App.css';

import DateDisplay from './components/DateDisplay';
import TimeDisplay from './components/TimeDisplay';
import LocationTitleDisplay from './components/LocationTitleDisplay';
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
      currentCoordinates: [],
      currentLocation: '',
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
      error: null
    };
  }

  componentDidMount() {
    // If browser geolocation is enabled, set coordinates in state.

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this._getForecast(position.coords.latitude, position.coords.longitude);

          this._getReverseGeolocation(position.coords.latitude, position.coords.longitude);

          this.setState({
            currentCoordinates: [position.coords.latitude, position.coords.longitude]
          });
        },

        // If geolocation fails, query ipinfo.io

        () => {
          fetch('https://ipinfo.io/geo', apiOpts)
            .then(res => res.json())
            .then((res) => {
              const location = res.loc.split(',');
              this.setState({
                currentCoordinates: [location[0], location[1]]
              });
              this._getForecast(location[0], location[1]);
            });
        }
      );
    } else {
      this.setState({
        error: new Error('Your browser does not support geolocation')
      });
    }
  }

  _getForecast = (latitude, longitude) => {
    const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/86c75ecb51f9869d11c2dcfb869d069a/${latitude},${longitude}`;

    apiSkeleton(url, apiOpts, this._onForecastSuccess, this._onForecastFail);
  }

  _onForecastSuccess = (response) => {
    const currentTemp = response.currently.temperature;
    const currentSummary = response.currently.summary;
    const currentDaySummary = response.hourly.summary;
    const currentWind = response.currently.windSpeed;
    const currentHumidity = response.currently.humidity;
    const currentVisibility = response.currently.visibility;
    const currentIcon = response.currently.icon;

    this.setState({
      currentTemp,
      currentSummary,
      currentDaySummary,
      currentWind,
      currentHumidity,
      currentVisibility,
      currentIcon
    }, this._handleWeatherUpdate(currentIcon));
  }

  _onForecastFail = (error) => {
    this.setState({
      error
    });
  }

  _getReverseGeolocation = (latitude, longitude) => {
    const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB2mV9wU6kQ4pTU-MFS1vUSRaAilCXorxA`;

    apiSkeleton(url, apiOpts, this._onReverseGeolocationSuccess, this._onReverseGeolocationFail);
  }

  _onReverseGeolocationSuccess = (response) => {
    const currentLocation = response.results[1].formatted_address;

    this.setState({
      currentLocation
    });
  }

  _onReverseGeolocationFail = (error) => {
    this.setState({
      error
    });
  }

  _handleWeatherUpdate = (currentIcon) => {
    this.setState({
      currentIconOptions: iconOptions(currentIcon)
    }, () => {
      document.body.style.background = `url(${this.state.currentIconOptions.background}) no-repeat center center fixed`;
      document.body.style.backgroundSize = 'cover';
    });
  }

  render() {
    const error = this.state.error;
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
      } else if (temp > 80) {
        return '#f26b18';
      }
    };

    const currentTempColor = tempColor(this.state.currentTemp);

    return (

      <div id="app-body">
        <div id="title-time">
          <DateDisplay day={moment().format('Do')} month={moment().format('MMMM')} year={moment().format('YYYY')} />
          <LocationTitleDisplay currentLocation={this.state.currentLocation} />
          <TimeDisplay time={moment().format('hh:mm A')} />
        </div>
        <div>
          <WeatherBoxDisplay currentWeather={currentWeather} tempColor={currentTempColor} currentIconOptions={this.state.currentIconOptions} />
        </div>

        {
          error &&
          <div style={{ color: 'red' }}>
            {error.message || error.toString} {` (${error.status} ${error.statusText})`}
          </div>
        }
      </div>
    );
  }
}

export default App;
