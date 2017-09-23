import React from "react";

export const LocationTitleDisplay = (props) => {
  return (
    <div id="location-title-display">
      <h1>{props.currentLocation}</h1>
    </div>
  );
};