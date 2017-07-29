import React from "react";
import { CurrentWeatherDisplay } from "./CurrentWeatherDisplay";
import { SearchLocationDisplay } from "./SearchLocationDisplay";

export class WeatherBoxDisplay extends React.Component {
  render() {
    return (
      <div>
        <CurrentWeatherDisplay currentForecast={this.props.currentForecast}/>
        <SearchLocationDisplay />
      </div>
    );
  }
}