import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import { AppState } from './types';

import nodes from './nodes';
import contracts from './contracts';

export const history = createBrowserHistory()

const rootReducer = combineReducers({
  router: connectRouter(history),
  nodes: nodes.reducer,
  contracts: contracts.reducer,
});

const loggerMiddleware = createLogger({
  stateTransformer: (state: AppState) => state,
});


const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware, routerMiddleware(history), thunk),
);


export default store;