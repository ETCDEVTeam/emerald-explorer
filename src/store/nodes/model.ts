import { EthRpc } from 'emerald-js';

export type Node = {
    url: string;
    id?: string;
    rpc?: EthRpc;
    blockNumber?: number;
    pendingBlock?: Block;
};

export type Block = {
  hash: string | null;
  transactions: string[];
};