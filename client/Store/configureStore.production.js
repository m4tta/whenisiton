import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../Reducers';

const router = routerMiddleware(browserHistory);

const enhancer = applyMiddleware(thunk, router);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer); // eslint-disable-line
}
