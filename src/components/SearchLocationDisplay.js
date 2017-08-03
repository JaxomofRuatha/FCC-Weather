import React from "react";

export class SearchLocationDisplay extends React.Component {
  render() {
    return (
      <div id="search-location">
        <h2>Check out the weather for a different location!</h2>
        <form>
          <input type="text" />  
        </form>
      </div>
    );
  }
}