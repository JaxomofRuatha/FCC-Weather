import React from "react";

export class CurrentWeatherDisplay extends React.Component {
  render() {
    return (
      <div>
        <div>
          <figure className="icons"><canvas id={this.props.currentForecast || "Should be icon here"}></canvas></figure>
          <h1>{this.props.currentForecast.currently.summary || "Should be weather here"}</h1>
          <h1>{Math.round(this.props.currentForecast.currently.temperature) || "Should be temperature here"}</h1>
          <button>Change temperature type!</button>
        </div>
        <div>
          <p>{this.props.currentForecast.minutely.summary || "Should be more specific weather here"}</p>
        </div>
        <div>
          <p>
            Wind: {this.props.currentForecast.currently.windSpeed || "Windspeed"} mph
            Humidity: {(this.props.currentForecast.currently.humidity * 100) || "Humidity"}%
            Visibility: {this.props.currentForecast.currently.visibility || "Miles"} miles
          </p>
        </div>
      </div>
    );
  }
}