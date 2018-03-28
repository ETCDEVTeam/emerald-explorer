
import { Store } from 'redux';
import { AppState } from './types';
import nodes from './nodes';

function refreshNodesState(store: Store<AppState>) {

  store.getState().nodes.nodes.forEach(async (n) => {
    if (n.rpc) {
      try {
        let blockNumber = await n.rpc.eth.getBlockNumber();
        let pendingBlock = await n.rpc.eth.getBlock('pending');
        const clientVersion = await n.rpc.web3.clientVersion();
        const networkId = await n.rpc.net.version();

        store.dispatch(nodes.actions.updateNodeStatus(
          n.id!, blockNumber, pendingBlock, clientVersion, networkId));
      } catch (err) {
        store.dispatch(nodes.actions.updateNodeStatusError(
          n.id!, err.message));
        console.error('Error while updating node', err);
      }
    }
  });

  setTimeout(() => refreshNodesState(store), 15000);
}

export function run(store: Store<AppState>) {
  refreshNodesState(store);
}