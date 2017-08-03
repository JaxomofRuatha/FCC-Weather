import React from "react";

export class DateDisplay extends React.Component {
  render() {
    return (
      <div id="date-display">
        <p>{this.props.month + " " + this.props.day}<br />{this.props.year}</p>
      </div>
    );
  }
}