import React from "react";

export const DateDisplay = (props) => {
  return (
    <div id="date-display">
      <p>{`${props.month + " " + props.day}, ${props.year}`}</p>
    </div>
  );
};