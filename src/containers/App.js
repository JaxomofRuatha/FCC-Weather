import React, { Component } from 'react';
import './App.css';
import { DateDisplay } from "../components/DateDisplay";
import { TimeDisplay } from "../components/TimeDisplay";
import { LocationTitleDisplay } from "../components/LocationTitleDisplay";
import { WeatherBoxDisplay } from "../components/WeatherBoxDisplay";


export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requestFailed: false,
      currentCoordinates: [null, null],
      currentForecast: { "currently": { "summary": "Not loaded", "temperature": "Not loaded", "windSpeed": "Not loaded", "humidity": "Not loaded", "visibility": "Not loaded" }, "minutely": { "summary": "Not loaded" } },
      currentGeolocation: {
        "results": {
          "address_components": [{ "long_name": "Not loaded"}, { "long_name": "Not loaded"}, { "long_name": "Not loaded"}, { "long_name": "Not loaded"}, {
            "long_name": "Not loaded"
          }, { "long_name": "Not loaded" }]
        }
      },
      currentDate: new Date(),
      forecasturl: "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/86c75ecb51f9869d11c2dcfb869d069a/",
      options: {
        cache: "default",
        dataType: "json",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET",
        mode: "cors"
      }
    };
    this._getReverseGeolocation = this._getReverseGeolocation.bind(this);
    this._changeGeolocation = this._changeGeolocation.bind(this);
    this._getForecast = this._getForecast.bind(this);
  }

  _getForecast() {

    fetch(this.state.forecasturl + this.state.currentCoordinates[0] + "," + this.state.currentCoordinates[1], this.state.options)
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

  _changeGeolocation() {

    let locationurl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=7601+Penn+Avenue+S,+Richfield,+MN&key=AIzaSyB2mV9wU6kQ4pTU-MFS1vUSRaAilCXorxA";

    fetch(locationurl, this.state.options)
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

    let geolocationurl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.state.currentCoordinates[0] + "," + this.state.currentCoordinates[1] + "&key=AIzaSyB2mV9wU6kQ4pTU-MFS1vUSRaAilCXorxA";

    fetch(geolocationurl, this.state.options)
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

    fetch("https://cors-anywhere.herokuapp.com/https://ipinfo.io/json", this.state.options)
      .then(response => {
        if (!response.ok) {
          throw Error("Network request failed");
        }
        return response.json();
      })
      .then(d => {
        var newCoords = d.loc.split(',');
        this.setState({
          currentCoordinates: newCoords
        })
      })
      .catch(err => {
        this.setState({
          requestFailed: true
        })
      })
    
    /*var _getGeolocation = options => new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(position => {
        resolve([position.coords.latitude, position.coords.longitude]);
      }, reject, options))
      .then(resolve => this.setState((prevState, props) => ({ currentCoordinates: [resolve[0], resolve[1]] })), console.log(this.state.currentCoordinates))
      .then(console.log(this.state.currentCoordinates), this._getForecast())
      .catch(reject => {
        console.error(reject.message);
        return fetch("https://ipinfo.io/json", this.state.options)
          .then(resolve => resolve.json())
          .then(position => position.loc.split(','))
          .catch(reject => console.error(reject.message));
      })
    
    _getGeolocation();*/
  }

  componentDidMount() {
    this._getForecast();
    this._getReverseGeolocation();
  }

  componentWillReceiveProps() {
    
  }
  
  render() {
    let ltcheck1;
    this.state.currentGeolocation ? ltcheck1 = <LocationTitleDisplay currentGeolocation={this.state.currentGeolocation} /> : ltcheck1 = null;

    let ltcheck2;
    this.state.currentForecast ? ltcheck2 = <WeatherBoxDisplay currentForecast={this.state.currentForecast} /> : ltcheck2 = null;

    return (
      <div>
        <div id="title-time">
          <DateDisplay dateString={this.state.currentDate.toDateString()} day={this.state.currentDate.getDate()} month={this.state.currentDate.getMonth()} year={this.state.currentDate.getFullYear()} />
          {ltcheck1}
          <TimeDisplay hour={this.state.currentDate.getHours()} minute={this.state.currentDate.getMinutes()} />
        </div>
        <div>
          {ltcheck2}
        </div> 
      </div>
    );
  }
}
