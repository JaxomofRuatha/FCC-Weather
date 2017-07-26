import React from "react";

export class SearchLocationDisplay extends React.Component {
  render() {
    return (
      <div>
        <h2>Enter a location:</h2>
        <form>
          <input type="text" />
          <input type="text" />  
        </form>
      </div>
    );
  }
}