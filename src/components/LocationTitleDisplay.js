import React from "react";

export class LocationTitleDisplay extends React.Component {
  render() {
    return (
      <h1 id="location-title-display">The current weather in<br />{this.props.currentLocation}</h1>
    );
  }
}