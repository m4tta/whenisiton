import React, { Component } from 'react';
import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router';

import Layout from './Containers/Layout';
import NotFound from './Containers/NotFound';
import Home from './Containers/Home';
import Time from './Components/Time';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}/>
      <Route path="/time" component={Time}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
