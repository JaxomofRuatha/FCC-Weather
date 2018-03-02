import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const TitleTime = props => (
  <header className="title-time">
    <span className="title-time__date">
      {`${moment().format('MMMM')} ${moment().format('Do')}, ${moment().format('YYYY')}`}
    </span>
    <h1 className="title-time__location">{props.currentLocation}</h1>
    <span className="title-time__now">{moment().format('hh:mm A')}</span>
  </header>
);

TitleTime.propTypes = {
  currentLocation: PropTypes.string.isRequired
};

export default TitleTime;
