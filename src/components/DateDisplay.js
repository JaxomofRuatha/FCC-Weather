import React from 'react';
import PropTypes from 'prop-types';

const DateDisplay = props => (
  <div id="date-display">
    <p>{`${props.month} ${props.day}, ${props.year}`}</p>
  </div>
);

DateDisplay.propTypes = {
  month: PropTypes.string,
  day: PropTypes.string,
  year: PropTypes.string
};

DateDisplay.defaultProps = {
  month: 'January',
  day: '01',
  year: '2017'
};

export default DateDisplay;
