import React from "react";

export class LocationTitleDisplay extends React.Component {
  render() {
    return (
      <h1>The current weather in<br />{this.props.currentGeolocation.results[3].formatted_address}</h1>
    );
  }
}