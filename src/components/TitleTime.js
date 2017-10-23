import React from 'react';
import moment from 'moment';

const TitleTime = props => (
  <div className="title-time">
    <span>
      {`${moment().format('MMMM')} ${moment().format('Do')}, ${moment().format('YYYY')}`}
    </span>
    <h1>{props.currentLocation}</h1>
    <span>{moment().format('hh:mm A')}</span>
  </div>
);

export default TitleTime;
