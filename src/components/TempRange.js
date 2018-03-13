import React from 'react';
import PropTypes from 'prop-types';

const TempRange = props => (
  <article className="temp-range">
    <span className="temp-range__label">High</span>
    <span className="temp-range__high">
      {props.tempRange && props.tempRange[1]}
    </span>
    <figure className="temp-range__gauge" />
    <span className="temp-range__low">
      {props.tempRange && props.tempRange[0]}
    </span>
    <span className="temp-range__label">Low</span>
  </article>
);

export default TempRange;
