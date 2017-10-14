import React from 'react';
import PropTypes from 'prop-types';

const LocationTitleDisplay = props => (
  <div id="location-title-display">
    <h1>{props.currentLocation}</h1>
  </div>
);

LocationTitleDisplay.propTypes = {
  currentLocation: PropTypes.string
};

LocationTitleDisplay.defaultProps = {
  currentLocation: 'No location loaded...'
};

export default LocationTitleDisplay;
