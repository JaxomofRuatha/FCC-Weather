import React from "react";

export const SearchLocationDisplay = (props) => {
  return (
    <div id="search-location">
      <h2>Check out the weather for a different location!</h2>
      <form>
        <input type="text" />
        <button type="submit">Go there!</button>
      </form>
    </div>
  );
};