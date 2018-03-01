import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

import { AppState } from './types';

import nodes from './nodes';

export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const router = routerMiddleware(history);

const rootReducer = combineReducers<AppState>({
  nodes: nodes.reducer
});

const loggerMiddleware = createLogger({
  stateTransformer: (state: AppState) => state,
});

const store: Store<AppState> = createStore<AppState>(
  rootReducer,
  applyMiddleware(loggerMiddleware, router)
);

export default store;