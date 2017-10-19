import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

const WeekDisplay = props => (
  <div className="flex-cent-row week-display">
    {props.weekWeather.map((val, index, arr) => (
      <div className="flex-cent-col">
        <span>{props.weekWeather[index].day}</span>
        <ReactAnimatedWeather
          color={props.weekWeather[index].icon.color}
          icon={props.weekWeather[index].icon.icon}
          size={50}
          animate
        />
        <span>{`${Math.floor(props.weekWeather[index].low)} / ${Math.floor(props.weekWeather[index].high)}`}</span>
      </div>
    ))}
  </div>
);

export default WeekDisplay;
