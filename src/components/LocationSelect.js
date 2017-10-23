import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';

const LocationSelect = props => (
  <form className="flex-cent-row" onSubmit={props.handleLocationChange}>
    <PlacesAutocomplete
      inputProps={props.inputProps}
      styles={{
        root: {
          width: '30vw'
        },
        input: {
          padding: '5px',
          width: 'inherit'
        }
      }}
    />

    <button type="submit">Go there!</button>
  </form>
);

export default LocationSelect;
