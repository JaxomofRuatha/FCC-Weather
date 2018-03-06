import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { fetchLocalCoords } from './lib/api';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        render={() => <App root fetchLocalCoords={fetchLocalCoords} />}
      />
      <Route
        exact
        path="/local"
        render={() => <App fetchLocalCoords={fetchLocalCoords} />}
      />
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
