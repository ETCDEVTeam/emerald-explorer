import { createStore, combineReducers, applyMiddleware } from 'redux';
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

const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware, router)
);

function refreshNodesState() {

  store.getState().nodes.nodes.forEach(async (n) => {
    if (n.rpc) {
      try {
        let blockNumber: number = await n.rpc.eth.getBlockNumber();
        let pendingBlock = await n.rpc.eth.getBlock('pending');
        store.dispatch(nodes.actions.updateNodeStatus(n.id!, blockNumber, pendingBlock));
      } catch (err) {
        console.error('Error while updating node', n);
      }
    }
  });

  setTimeout(refreshNodesState, 5000);
}

refreshNodesState();

export default store;