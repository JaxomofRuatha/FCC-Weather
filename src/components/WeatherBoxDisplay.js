import React from "react";
import CurrentWeatherDisplay from "./CurrentWeatherDisplay";
import { SearchLocationDisplay } from "./SearchLocationDisplay";

export const WeatherBoxDisplay = (props) => {
  return (
    <div id="weather-box-display">
      <CurrentWeatherDisplay
        currentWeather={props.currentWeather}
        tempColor={props.tempColor}
        currentIconOptions={props.currentIconOptions}
      />
      <SearchLocationDisplay />
    </div>
  );
};