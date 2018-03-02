import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import PropTypes from 'prop-types';

const WeekDisplay = props => (
  <section className="week-display">
    {props.weekWeather &&
      props.weekWeather.map((val, index) => (
        <article className="week-display__day" key={index}>
          <span>{props.weekWeather[index].day}</span>
          <ReactAnimatedWeather
            color={props.weekWeather[index].icon.color}
            icon={props.weekWeather[index].icon.icon}
            size={50}
            animate
          />
          <span>
            {`${Math.floor(props.weekWeather[index].low)} / ${Math.floor(props.weekWeather[index].high)}`}
          </span>
        </article>
      ))}
  </section>
);

WeekDisplay.propTypes = {
  weekWeather: PropTypes.arrayOf(PropTypes.shape({
    day: PropTypes.string,
    high: PropTypes.number,
    low: PropTypes.number,
    icon: PropTypes.string
  })).isRequired
};

export default WeekDisplay;
