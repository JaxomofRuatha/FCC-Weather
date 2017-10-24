import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlacesAutocomplete from 'react-places-autocomplete';

// TODO: Hook up _getWeather to "See my local weather!", change route to "/local"
// TODO: Have the route params be the coordinates, allow match to run _getWeather from param coords
// TODO: Have default background whenever going to change location and initial landing
// TODO: Not found page
// TODO: Styling for autocomplete and landing page, responsive for both (emotion.js? Loading icon and animations between routes?)
// TODO: Add keys to weekly weather

// AWARE: Might need to bind "this" for autocomplete

/*
  1. New visitor should see landing page with root URL, initial state should mount in the background
  2. Selecting local weather should send to "/local" (AWARE going to "/local" directly should run getWeather as originally set up!) and render main app body after running getWeather
  3. Selecting specific location should run reverse geo and send to "/{latitude},{longitude}" (get/store these in App state, pass as props?)
  4. Any other route should redirect to root
*/

const LocationSelect = props => (
  <div className="location-select">
    <Link to="/local" onClick={props.getLocalCoords}>See my local weather!</Link>
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
      <Link to={"/333,333"}>
        <button type="submit">Go there!</button>
      </Link>
    </form>
  </div>
);

export default LocationSelect;
