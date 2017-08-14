import React from "react";

export class LocationTitleDisplay extends React.Component {
  render() {
    return (
      <div id="location-title-display">
        <h1>{this.props.currentLocation}</h1>
      </div>  
    );
  }
}