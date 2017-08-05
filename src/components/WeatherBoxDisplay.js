import React from "react";
import CurrentWeatherDisplay from "./CurrentWeatherDisplay";
import { SearchLocationDisplay } from "./SearchLocationDisplay";

export class WeatherBoxDisplay extends React.Component {
  render() {
    return (
      <div id="weather-box-display">
        <CurrentWeatherDisplay
          currentWeather={this.props.currentWeather}
          tempColor={this.props.tempColor}
          currentIconOptions={this.props.currentIconOptions}
        />
        <SearchLocationDisplay />
      </div>
    );
  }
}