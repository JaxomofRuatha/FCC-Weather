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
  <React.Fragment>
    <Link to="/local">
      <button className="local-button">See my local weather!</button>
    </Link>
    <span>or</span>
    <form className="auto-form" onSubmit={props.handleLocationChange}>
      <PlacesAutocomplete
        inputProps={props.inputProps}
        autocompleteItem={AutoCompleteItem}
        styles={{
          root: {
            flex: 5
          },
          input: {
            background: 'inherit',
            color: '#EDF4FF',
            border: '1px solid #68a2ff'
          },
          autocompleteContainer: {
            backgroundColor: '#020131',
            color: '#EDF4FF',
            border: '1px solid #68a2ff',
            marginTop: '-1px'
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
            padding: '0.5rem',
            border: 'none'
          },
          googleLogoImage: {
            width: 100
          }
        }}
      />
      <button type="submit" className="auto-form__submit">
        Go there!
      </button>
    </form>
  </React.Fragment>
);

LocationSelect.propTypes = {
  getLocalCoords: PropTypes.func.isRequired,
  handleLocationChange: PropTypes.func.isRequired,
  inputProps: PropTypes.object,
  currentCoords: PropTypes.objectOf(PropTypes.number)
};

export default LocationSelect;
