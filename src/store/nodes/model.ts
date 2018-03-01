import { EthRpc } from 'emerald-js';

export type Node = {
    url: string;            // remote RPC endpoint
    clientVersion?: string; // fullnode version
    id?: string;
    rpc?: EthRpc;
    blockNumber?: number;  // last block numbder
    pendingBlock?: Block;  // current pending block
    error?: string | null; // any error occured during communication
};

export type Block = {
  hash: string | null;
  transactions: string[];
};