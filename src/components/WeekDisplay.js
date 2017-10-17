import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

const WeekDisplay = props => (
  <div className="week-display">
    <div className="flex-cent-col">
      <span>Mon</span>
      <ReactAnimatedWeather
        color="#68a2ff"
        icon="CLEAR_DAY"
        size={30}
        animate
      />
      <span>0&nbsp;/&nbsp;100</span>
    </div>
  </div>
);

export default WeekDisplay;
