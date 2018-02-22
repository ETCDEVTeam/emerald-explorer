import { UPDATE_NODE_STATUS } from './constants';
import { Block } from './model';

export interface UpdateNodeStatus {
    type: typeof UPDATE_NODE_STATUS;
    nodeId: string;
    blockNumber: number;
    pendingBlock: Block;
}

export function updateNodeStatus(nodeId: string, blockNumber: number, pendingBlock: Block): UpdateNodeStatus {
    return {
        type: UPDATE_NODE_STATUS,
        nodeId,
        blockNumber,
        pendingBlock,
    };
}

export type NodesAction = UpdateNodeStatus;