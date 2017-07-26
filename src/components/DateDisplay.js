import React from "react";

export class DateDisplay extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.dateString}</p>
      </div>
    );
  }
}