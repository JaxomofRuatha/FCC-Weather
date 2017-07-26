import React, { Component } from 'react';
import './App.css';
import { DateDisplay } from "../components/DateDisplay";
import { TimeDisplay } from "../components/TimeDisplay";
import { LocationTitleDisplay } from "../components/LocationTitleDisplay";
import { WeatherBoxDisplay } from "../components/WeatherBoxDisplay";

var currentDate = new Date();
var currentLatitude;
var currentLongitude;
const options = {
  cache: "default",
  dataType: "json",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  method: "GET",
  mode: "cors"
};

if (navigator.geolocation) {

  let options = {
    enableHighAccuracy: true,
    timeout: 60000,
  };

  function success(position) {
    currentLatitude = position.coords.latitude;
    currentLongitude = position.coords.longitude;
    console.log(currentLatitude + "," + currentLongitude);
  }

  function errorHandler(err) {
    if (err.code === 1) {
      alert("Error: Access is denied!");
    }

    else if (err.code === 2) {
      alert("Error: Position is unavailable!");
    }
  }

  navigator.geolocation.getCurrentPosition(success, errorHandler, options);
  console.log(currentLatitude + "," + currentLongitude);
}
else {
  alert("Sorry, your browser does not support geolocation!");
}

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requestFailed: false,
    };
    this._getReverseGeolocation = this._getReverseGeolocation.bind(this);
    this._getGeolocation = this._getGeolocation.bind(this);
    this._getForecast = this._getForecast.bind(this);
  }

  _getForecast() {

    let forecasturl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/86c75ecb51f9869d11c2dcfb869d069a/" + currentLatitude + "," + currentLongitude;

    fetch(forecasturl, options)
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed");
        }
        return response.json();
      })
      .then(d => {
        this.setState({
          currentForecast: d,
        })
      })
      .catch(err => {
        this.setState({
          requestFailed: true
        })
      })
  }

  _getGeolocation() {

    let locationurl = "https://maps.googleapis.com/maps/api/geocode/json?address=7601+Penn+Avenue+S,+Richfield,+MN&key=AIzaSyB2mV9wU6kQ4pTU-MFS1vUSRaAilCXorxA";

    fetch(locationurl, options)
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed");
        }
        return response.json();
      })
      .then(d => {
        this.setState({
          currentGeolocation: d
        })
      })
      .catch(err => {
        this.setState({
          requestFailed: true
        })
      })
  }

  _getReverseGeolocation() {

    let geolocationurl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=44.977753,-93.265011&key=AIzaSyB2mV9wU6kQ4pTU-MFS1vUSRaAilCXorxA";

    fetch(geolocationurl, options)
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed");
        }
        return response.json();
      })
      .then(d => {
        this.setState({
          currentGeolocation: d,
        })
      })
      .catch(err => {
        this.setState({
          requestFailed: true
        })
      })
  }

  componentWillMount() {
    this._getForecast();
  } 

  render() {
    return (
      <div>
        <div id="title-time">
          <DateDisplay dateString={currentDate.toDateString()} day={currentDate.getDate()} month={currentDate.getMonth()} year={currentDate.getFullYear()} />
          <LocationTitleDisplay latitude={currentLatitude} longitude={currentLatitude} />
          <TimeDisplay hour={currentDate.getHours()} minute={currentDate.getMinutes()} />
        </div>
        <div>
          <WeatherBoxDisplay forecastData={this.state.currentForecast}/>
        </div> 
      </div>
    );
  }
}
