import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlacesAutocomplete from 'react-places-autocomplete';

const AutoCompleteItem = ({ formattedSuggestion }) => (
  <div>
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small>{formattedSuggestion.secondaryText}</small>
  </div>
);

const LocationSelect = props => (
  <div className="location-select">
    <Link to="/local" onClick={props.getLocalCoords}>
      <button className="local-button">See my local weather!</button>
    </Link>
    <span>or</span>
    <form className="flex-cent-row" onSubmit={props.handleLocationChange}>
      <PlacesAutocomplete
        inputProps={props.inputProps}
        autocompleteItem={AutoCompleteItem}
        styles={{
          root: {
            width: '40rem'
          },
          input: {
            background: 'inherit',
            color: '#EDF4FF',
            border: '1px solid #68a2ff'
          },
          autocompleteContainer: {
            'backgroundColor': '#020131',
            'color': '#EDF4FF',
            'border': '1px solid #68a2ff',
            'margin-top': '-1px'
          },
          autocompleteItem: {
            backgroundColor: '#020131',
            color: '#EDF4FF',
            border: 'none'
          },
          autocompleteItemActive: {
            backgroundColor: '#68a2ff',
            color: '#020131'
          },
          googleLogoContainer: {
            backgroundColor: 'rgba(132, 154, 214, 0.35)',
            paddiing: '0.5rem',
            border: 'none'
          },
          googleLogoImage: {
            width: 100
          }
        }}
      />
      <button type="submit" className="change-submit">
        Go there!
      </button>
    </form>
  </div>
);

LocationSelect.propTypes = {
  getLocalCoords: PropTypes.func.isRequired,
  handleLocationChange: PropTypes.func.isRequired,
  inputProps: PropTypes.object,
  currentCoords: PropTypes.objectOf(PropTypes.number)
};

export default LocationSelect;
