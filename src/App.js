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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {},
      siUnits: false,
      fetching: false
    };
  }

  setCoords = (coords) => {
    this.setState(
      { currentCoords: coords, fetching: true },
      this._updateWeather(this.state.currentCoords)
    );
  };

  _updateWeather = (coords) => {
    const forecast = api.fetchForecast(coords);
    const location = api.fetchReverseGeolocation(coords);

    forecast.current.location = location;

    this.setState(forecast);
  };

  // _getLocalCoords = () => {
  //   // If browser geolocation is enabled, set coordinates in state.

  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const lat = position.coords.latitude;
  //         const lng = position.coords.longitude;

  //         this._setCoords(lat, lng);
  //       },

  //       // If geolocation fails, query ipinfo.io to set the coordinates in state instead

  //       () => {
  //         fetch('https://ipinfo.io/geo', apiOpts).then((res) => {
  //           const location = res.loc.split(',');

  //           this._setCoords(location[0], location[1]);
  //         });
  //       }
  //     );
  //   }
  // };

  // _getForecast = (coords) => {
  //   const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/86c75ecb51f9869d11c2dcfb869d069a/${lat},${lng}`;

  //   apiSkeleton(url, apiOpts)
  //     .then((res) => {
  //       const weekWeather = [];

  //       // Populate data for the 7-day forecast in an array.
  //       for (let i = 1; i < 7; i++) {
  //         weekWeather.push({
  //           day: moment.unix(res.daily.data[i].time).format('ddd DD'),
  //           high: res.daily.data[i].temperatureHigh,
  //           low: res.daily.data[i].temperatureLow,
  //           icon: iconOptions(res.daily.data[i].icon)
  //         });
  //       }

  //       this.setState(
  //         {
  //           current: Object.assign({}, this.state.current, {
  //             temp: res.currently.temperature,
  //             summary: res.currently.summary,
  //             dayForecast: res.hourly.summary,
  //             wind: `${res.currently.windSpeed} mph`,
  //             humidity: res.currently.humidity,
  //             visibility: `${res.currently.visibility} mi`,
  //             icon: iconOptions(res.currently.icon)
  //           }),
  //           tempRange: [
  //             Math.floor(res.daily.data[0].temperatureLow),
  //             Math.floor(res.daily.data[0].temperatureHigh)
  //           ],
  //           weekWeather
  //         },
  //         () => {
  //           document.body.style.background = `url(${
  //             this.state.current.icon.background
  //           }) no-repeat center center fixed`;
  //           document.body.style.backgroundSize = 'cover';
  //         }
  //       );
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // };

  // _getReverseGeolocation = (lat, lng) => {
  //   const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB2mV9wU6kQ4pTU-MFS1vUSRaAilCXorxA`;

  //   apiSkeleton(url, apiOpts)
  //     .then((res) => {
  //       const currentLocation = `${
  //         res.results[3].address_components[0].long_name
  //       }, ${res.results[3].address_components[2].long_name}`;

  //       this.setState({
  //         current: Object.assign({}, this.state.current, {
  //           location: currentLocation
  //         })
  //       });
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // };

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

  // _handleUnitSwitch = () => {
  //   function weekHelper(week, converter) {
  //     return week.map(day => ({
  //       day: day.day,
  //       high: converter(day.high),
  //       low: converter(day.low),
  //       icon: day.icon
  //     }));
  //   }

  //   const toggleSwitch = document.querySelector('.weather-summary__checkbox');
  //   toggleSwitch.checked = !toggleSwitch.checked;

  //   if (this.state.siUnits === false) {
  //     document.getElementById('deg-unit').innerHTML = '&#8451;';

  //     this.setState({
  //       current: Object.assign({}, this.state.current, {
  //         temp: toMetricTemp(this.state.currentTemp),
  //         wind: `${toMetricDist(Number(windValue))} kph`,
  //         visibility: `${toMetricDist(Number(visValue))} km`
  //       }),
  //       tempRange: toMetricTemp(this.state.tempRange),
  //       weekWeather: weekHelper(this.state.weekWeather, toMetricTemp),
  //       siUnits: true
  //     });
  //   } else {
  //     document.getElementById('deg-unit').innerHTML = '&#8457;';

  //     this.setState({
  //       current: Object.assign({}, this.state.current, {
  //         temp: fromMetricTemp(this.state.currentTemp),
  //         wind: `${fromMetricDist(Number(windValue))} mph`,
  //         visibility: `${fromMetricDist(Number(visValue))} mi`
  //       }),
  //       tempRange: fromMetricTemp(this.state.tempRange),
  //       weekWeather: weekHelper(this.state.weekWeather, fromMetricTemp),
  //       siUnits: false
  //     });
  //   }
  // };

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
