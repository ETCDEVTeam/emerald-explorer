import * as React from 'react';
import { Link } from 'react-router-dom';
import { BlockWithoutTxData } from 'emerald-js';

export interface BlockListProps {
  blocks: Array<BlockWithoutTxData>;
  nodeId: string;
}

function ListItem(props: { block: BlockWithoutTxData; nodeId: string; }) {
  const { block, nodeId } = props;
  return (
    <tr>
      <td>{block.number}</td>
      <td><Link to={`/node/${nodeId}/block/${block.hash}`}>{block.hash}</Link></td>
      <td>{block.timestamp}</td>
      <td>{block.transactions.length}</td>
    </tr>);
}

function BlockList(props: BlockListProps) {
  const { blocks, nodeId } = props;
  return (
    <table>
      <thead>
        <tr>
          <td>#</td>
          <td>Hash</td>
          <td>Timestamp</td>
          <td>Txs</td>
        </tr>
      </thead>
      <tbody>
        {blocks.map(b => (<ListItem key={b.number!} block={b} nodeId={nodeId}/>))}
      </tbody>
    </table>);
}

export default BlockList;