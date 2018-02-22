import { EthRpc, JsonRpc, HttpTransport  } from 'emerald-js';
import { Node } from './model';
import { NodesAction, UpdateNodeStatus } from './actions';
import { UPDATE_NODE_STATUS } from './constants';

export interface State {
    nodes: Node[];
}

const initialState = {
    nodes: [
        {
            id: '1',
            url: 'http://web3.gastracker.io',
            rpc: new EthRpc(new JsonRpc(new HttpTransport('http://web3.gastracker.io')))
        },
        {
            id: '2',
            url: 'https://mewapi.epool.io',
            rpc: new EthRpc(new JsonRpc(new HttpTransport('https://mewapi.epool.io')))
        }
    ]
};

function onUpdateNodeStatus(state: State, action: UpdateNodeStatus): State {
    if (action.type === UPDATE_NODE_STATUS) {
        const nodes = state.nodes.map(node => 
            node.id === action.nodeId ?
            { 
                ...node, 
                blockNumber: action.blockNumber,
                pendingBlock: action.pendingBlock,
             } : node
        );
        return {...state, nodes };
    }

    return state;
}

export default function reduce(state: State, action: NodesAction) {
    state = state || initialState;
    state = onUpdateNodeStatus(state, action);
    return state;
} 