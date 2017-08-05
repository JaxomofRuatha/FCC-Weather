import React, { Component } from 'react';
import moment from "moment";
import { DateDisplay } from "./components/DateDisplay";
import { TimeDisplay } from "./components/TimeDisplay";
import { LocationTitleDisplay } from "./components/LocationTitleDisplay";
import { WeatherBoxDisplay } from "./components/WeatherBoxDisplay";
import * as APIHelpers from "./utils/APIHelpers";
import "normalize.css";
import "./App.css";

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentCoordinates: [],
      currentLocation: "",
      currentTemp: "",
      currentSummary: "",
      currentDaySummary: "",
      currentWind: "",
      currentHumidity: "",
      currentVisibility: "",
      currentIcon: "",
      error: null
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this._getForecast(position.coords.latitude, position.coords.longitude);

          this._getReverseGeolocation(position.coords.latitude, position.coords.longitude);

          this.setState({
            currentCoordinates: [position.coords.latitude, position.coords.longitude]
          })
        },

        () => {
          this.setState({
            error: new Error("Failed request to geolocation")
          });
          fetch("https://ipinfo.io/json", APIHelpers.options)
            .then((response) => {
              if (response.ok) {
                this.setState({
                  currentCoordinates: [response.loc[0], response.loc[1]]
                });
            }
          })
        }
      );
        } else {
      this.setState({
        error: new Error("Your browser does not support geolocation")
      });
    }
  }  

  _getForecast = (latitude, longitude) => {
    const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/86c75ecb51f9869d11c2dcfb869d069a/${latitude},${longitude}`

    APIHelpers.apiSkeleton(url, APIHelpers.options, this._onForecastSuccess, this._onForecastFail);
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
    })
  }

  _onForecastFail = (error) => {
    this.setState({
      error
    });
  }

  _getReverseGeolocation = (latitude, longitude) => {

    const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB2mV9wU6kQ4pTU-MFS1vUSRaAilCXorxA`;

    APIHelpers.apiSkeleton(url, APIHelpers.options, this._onReverseGeolocationSuccess, this._onReverseGeolocationFail);
  }

  _onReverseGeolocationSuccess = (response) => {
    const currentLocation = response.results[1].formatted_address;

    this.setState({
      currentLocation
    })
  }
  
  _onReverseGeolocationFail = (error) => {
    this.setState({
      error
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
        return "#00229E"
      }
      else if (temp <= 60) {
        return "#1CF20C"
      }
      else if (temp <= 80) {
        return "#EBA713"
      }
      else if (temp > 80) {
        return "#f26b18"
      }
    };

    return (

      <div id="app-body">
        <div id="title-time">
          <DateDisplay day={moment().format("Do")} month={moment().format("MMMM")} year={moment().format("YYYY")} />
          <LocationTitleDisplay currentLocation={this.state.currentLocation} />
          <TimeDisplay time={moment().format("hh:mm A")} />
        </div>
        <div id="box-wrap">
          <WeatherBoxDisplay currentWeather={currentWeather} tempColor={tempColor} />
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
