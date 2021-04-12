import React from 'react';
import ReactDOM from 'react-dom';

import HomePage from './pages/Home';
import WatchPage from './pages/Watch';
import FavoritesPage from './pages/Favorites';
import NotFoundPage from './pages/NotFound';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/watch/:id">
          <WatchPage />
        </Route>
        <Route path="/favorites">
          <FavoritesPage />
        </Route>
        <Route path='/404'>
          <NotFoundPage />
        </Route>
        <Redirect from='*' to='/404' />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);