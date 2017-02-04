import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Layout from './Containers/Layout';
import NotFound from './Containers/NotFound';
import Home from './Containers/Home';
import Show from './Containers/Show';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home}/>
    <Route path="/show/:id" component={Show}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
