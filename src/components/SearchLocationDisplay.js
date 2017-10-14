import React from 'react';

const SearchLocationDisplay = props => (
  <div id="search-location">
    <h2>Check out the weather for a different location!</h2>
    <form>
      <input type="text" />
      <button type="submit">Go there!</button>
    </form>
  </div>
);

export default SearchLocationDisplay;
