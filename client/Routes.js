import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import Layout from './Containers/Layout';
import NotFound from './Containers/NotFound';
import Home from './Containers/Home';
import Show from './Containers/Show';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home}/>
    <Route path="/show/:id" component={Show}/>
    <Redirect from="*" to="/"/>
  </Route>
);
