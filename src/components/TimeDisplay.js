import React from 'react';
import PropTypes from 'prop-types';

const TimeDisplay = props => (
  <div id="time-display">
    <p>{props.time}</p>
  </div>
);

TimeDisplay.propTypes = {
  time: PropTypes.string
};

TimeDisplay.defaultProps = {
  time: '00:00'
};

export default TimeDisplay;
