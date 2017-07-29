import React from "react";
import { CurrentWeatherDisplay } from "./CurrentWeatherDisplay";
import { SearchLocationDisplay } from "./SearchLocationDisplay";

export class WeatherBoxDisplay extends React.Component {
  render() {
    return (
      <div>
        <CurrentWeatherDisplay currentWeather={this.props.currentWeather}/>
        <SearchLocationDisplay />
      </div>
    );
  }
}