import React from 'react';
import PropTypes from 'prop-types';

const TempRange = props => (
  <article className="temp-range">
    <div className="temp-range__wrapper">
      <span className="temp-range__high">
        {props.tempRange && props.tempRange[1]}
      </span>
      <span className="temp-range__label">High</span>
    </div>
    <figure className="temp-range__gauge" />
    <div className="temp-range__wrapper">
      <span className="temp-range__low">
        {props.tempRange && props.tempRange[0]}
      </span>
      <span className="temp-range__label">Low</span>
    </div>
  </article>
);

export default TempRange;
