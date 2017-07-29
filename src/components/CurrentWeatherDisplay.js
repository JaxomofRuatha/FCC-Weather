import React from "react";

export class CurrentWeatherDisplay extends React.Component {
  render() {
    return (
      <div>
        <div>
          <figure className="icons"><canvas id={this.props.currentWeather.currentIcon || "Should be icon here"}></canvas></figure>
          <h1>{this.props.currentWeather.currentSummary || "Should be weather here"}</h1>
          <h1>{Math.round(this.props.currentWeather.currentTemp) || "Should be temperature here"}</h1>
          <button>Change temperature type!</button>
        </div>
        <div>
          <p>{this.props.currentWeather.currentDaySummary || "Should be more specific weather here"}</p>
        </div>
        <div>
          <p>
            Wind: {this.props.currentWeather.currentWind || "Windspeed"} mph
            Humidity: {(this.props.currentWeather.currentHumidity * 100) || "Humidity"}%
            Visibility: {this.props.currentWeather.currentVisibility || "Miles"} miles
          </p>
        </div>
      </div>
    );
  }
}