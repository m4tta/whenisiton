import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './Routes';
import configureStore from './Store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

import './app.scss'

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
