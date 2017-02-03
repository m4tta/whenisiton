import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import show from './show';
import client from './client';

const rootReducer = combineReducers({
  client,
  show,
  routing
});

export default rootReducer;
