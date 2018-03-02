import React from 'react';
import PropTypes from 'prop-types';

const TempRange = props => (
  <div className="flex-cent-row">
    <div className="flex-cent-col">
      <span style={{ color: 'darkblue' }}>
        {props.tempRange && props.tempRange[0]}
      </span>
      <span className="temp-label">Low</span>
    </div>
    <div className="temp-gauge" />
    <div className="flex-cent-col">
      <span style={{ color: 'darkred' }}>
        {props.tempRange && props.tempRange[1]}
      </span>
      <span className="temp-label">High</span>
    </div>
  </div>
);

export default TempRange;
