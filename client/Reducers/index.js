import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import show from './show';
import client from './client';
import search from './search';

const rootReducer = combineReducers({
  search,
  client,
  show,
  routing
});

export default rootReducer;
