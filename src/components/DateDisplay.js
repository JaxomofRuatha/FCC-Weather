import React from "react";

export class DateDisplay extends React.Component {
  render() {
    return (
      <div id="date-display">
        <p>{this.props.dateString}</p>
      </div>
    );
  }
}