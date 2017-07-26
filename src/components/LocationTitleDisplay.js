import React from "react";

export class LocationTitleDisplay extends React.Component {
  render() {
    return (
      <h1>The current weather in<br />{this.props.latitude}, {this.props.longitude}</h1>
    );
  }
}