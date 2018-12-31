import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* Initial landing handler, directs to LocationSelect */}
      <Route
        exact
        path="/"
        render={({ history }) => {
          const handleSearch = (coords) => {
            history.push(`/${coords.lat},${coords.lng}`);
          };

          return <App root handleSearch={handleSearch} />;
        }}
      />
      {/* Gets local weather, static URL */}
      <Route exact path="/local" render={() => <App local />} />
      {/* Fetches weather based on coordinates entered in URL or form */}
      <Route
        exact
        path="/:locationId"
        render={({ match }) => {
          const newCoords = {
            lat: match.params.locationId.split(',')[0],
            lng: match.params.locationId.split(',')[1]
          };

          return <App newCoords={newCoords} />;
        }}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
