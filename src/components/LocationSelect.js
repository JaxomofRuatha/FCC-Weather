import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlacesAutocomplete from 'react-places-autocomplete';

const renderFunc = ({
  getInputProps, suggestions, getSuggestionItemProps, loading
}) => (
  <React.Fragment>
    <input
      {...getInputProps({
        placeholder: 'Check out the weather for a different location!'
      })}
    />
    <div className="autocomplete-dropdown-container">
      {loading && <div>Loading...</div>}
      {suggestions.map((suggestion) => {
        const className = suggestion.active
          ? 'suggestion-item--active'
          : 'suggestion-item';
        // inline style for demonstration purpose
        const style = suggestion.active
          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
          : { backgroundColor: '#ffffff', cursor: 'pointer' };
        return (
          <div
            {...getSuggestionItemProps(suggestion, {
              className,
              style,
            })}
          >
            <span>{suggestion.description}</span>
          </div>
        );
      })}
    </div>
  </React.Fragment>
);

const LocationSelect = ({ handleLocationChange, inputProps }) => (
  <section className="location-select">
    <Link to="/local">
      <button className="local-button" type="submit">See my local weather!</button>
    </Link>
    <span>or</span>
    <form className="auto-form" onSubmit={handleLocationChange}>
      <PlacesAutocomplete
        value={inputProps.value}
        onChange={inputProps.onChange}
      >
        {renderFunc}
      </PlacesAutocomplete>
      <button type="submit" className="auto-form__submit">
        Go there!
      </button>
    </form>
  </section>
);

LocationSelect.propTypes = {
  handleLocationChange: PropTypes.func.isRequired,
  inputProps: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired
  }).isRequired
};

export default LocationSelect;
