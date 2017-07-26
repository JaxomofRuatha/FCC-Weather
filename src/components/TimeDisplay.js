import React from "react";

export class TimeDisplay extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.hour}:{this.props.minute}</p>
      </div>
    );
  }
}