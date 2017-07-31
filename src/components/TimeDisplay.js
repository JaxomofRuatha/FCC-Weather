import React from "react";

export class TimeDisplay extends React.Component {
  render() {
    return (
      <div id="time-display">
        <p>{this.props.time}</p>
      </div>
    );
  }
}