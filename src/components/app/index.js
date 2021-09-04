import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage } from './home_page';
import { FilePage } from './file_page';
import { EntryPage } from './entry_page';

export const RootApp = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/file">
        <FilePage />
      </Route>
      <Route path="/entry/:id">
        <EntryPage />
      </Route>
    </Switch>
  </Router>
);
