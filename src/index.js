import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <App root />} />
      <Route exact path="/local" render={() => <App local />} />
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
