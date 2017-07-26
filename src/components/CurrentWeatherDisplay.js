import React from "react";

export class CurrentWeatherDisplay extends React.Component {
  render() {
    return (
      <div>
        <div>
          <figure className="icons"><canvas id={this.props.currentForecast.currently.icon}></canvas></figure>
          <h1>{this.props.currentForecast.currently.summary}</h1>
          <h1>{Math.round(this.props.currentForecast.currently.temperature)}</h1>
          <button>Change temperature type!</button>
        </div>
        <div>
          <p>{this.props.currentForecast.minutely.summary}</p>
        </div>
        <div>
          <p>
            Wind: {this.props.currentForecast.currently.windSpeed} mph
            Humidity: {this.props.currentForecast.currently.humidity * 100}%
            Visibility: {this.props.currentForecast.currently.visibility} miles
          </p>
        </div>
      </div>
    );
  }
}