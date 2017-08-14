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
      currentIconOptions: {
        icon: "CLEAR_DAY",
        color: "",
        background: ""
      },
      error: null
    };
  }

  componentDidMount() {

    //If browser geolocation is enabled, set coordinates in state.

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {

          this._getForecast(position.coords.latitude, position.coords.longitude);

          this._getReverseGeolocation(position.coords.latitude, position.coords.longitude);

          this.setState({
            currentCoordinates: [position.coords.latitude, position.coords.longitude]
          });
        },

    //If geolocation fails, throw an error and query ipinfo.io

        () => {
          this.setState({
            error: new Error("Failed request to geolocation")
          });
          fetch("https://ipinfo.io/geo", APIHelpers.options)
           
            .then(res => res.json())
            .then((res) => {
              const location = res.loc.split(",");
              this.setState({
                currentCoordinates: [location[0], location[1]]
              });
              this._getForecast(location[0], location[1]);
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
    }, this._handleWeatherUpdate(currentIcon));
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
    });
  }
  
  _onReverseGeolocationFail = (error) => {
    this.setState({
      error
    });
  }

  _handleWeatherUpdate = (currentIcon) => {

    const iconOptions = (currentIcon) => {
      switch (currentIcon) {
        case "clear-day": return {
          icon: 'CLEAR_DAY',
          color: '#fce637',
          background: 'https://c.pxhere.com/photos/75/6c/sun_halo_rainbow_blue_sunny_day_beautiful_circle-720900.jpg!d'
        };
        case "clear-night": return {
          icon: 'CLEAR_NIGHT',
          color: '#FFFFFF',
          background: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/February_-conservationlands15_Social_Media_Takeover-_Top_15_Places_on_National_Conservation_Lands_for_Night_Sky_Viewing_%2816358792937%29.jpg'
        };
        case "partly-cloudy-day": return {
          "icon": 'PARTLY_CLOUDY_DAY',
          "color": '#FFFDED',
          background: 'https://static.pexels.com/photos/55787/pexels-photo-55787.jpeg'
        };
        case "partly-cloudy-night": return {
          icon: 'PARTLY_CLOUDY_NIGHT',
          color: '#edf4ff',
          background: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/British_Night_Sky_%286819479424%29.jpg'
        };
        case "cloudy": return {
          icon: 'CLOUDY',
          color: '#edf4ff',
          background: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Cloudy_Sky_of_Ahwaz.JPG'
        };
        case "rain": return {
          icon: 'RAIN',
          color: '#91bbff',
          background: 'https://static.pexels.com/photos/1553/glass-rainy-car-rain.jpg'
        };
        case "sleet": return {
          icon: 'SLEET',
          color: '#7d99c6',
          background: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Frozen_road_with_trees_december_2008_ice_storm.JPG'
        };
        case "snow": return {
          icon: 'SNOW',
          color: '#c2cad6',
          background: 'https://c.pxhere.com/photos/5b/e6/cold_snow_forest_winter_trees_fog_foggy_snowing-592107.jpg!d'
        };
        case "wind": return {
          icon: 'WIND',
          color: '#3FBF74',
          background: 'https://c.pxhere.com/photos/72/27/landscape_spring_lake_nature_reserve_nature_moorland_wetland_summer_grasses-547407.jpg!d'
        };
        case "fog": return {
          icon: 'FOG',
          color: '#cdd1d6',
          background: 'https://static.pexels.com/photos/18855/pexels-photo.jpg'
        };
      }
    };

    this.setState({
      currentIconOptions: iconOptions(currentIcon)
    }, () => {
      document.body.style.background = `url(${this.state.currentIconOptions.background}) no-repeat center center fixed`;
      document.body.style.backgroundSize = "cover";
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

    const currentTempColor = tempColor(this.state.currentTemp);

    return (

      <div id="app-body">
        <div id="title-time">
          <DateDisplay day={moment().format("Do")} month={moment().format("MMMM")} year={moment().format("YYYY")} />
          <LocationTitleDisplay currentLocation={this.state.currentLocation} />
          <TimeDisplay time={moment().format("hh:mm A")} />
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
