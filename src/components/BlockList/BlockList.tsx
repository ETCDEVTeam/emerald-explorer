import * as React from 'react';
import { Link } from 'react-router-dom';
import { BlockWithoutTxData } from 'emerald-js';
import './BlockList.css';

interface Props {
  blocks: Array<BlockWithoutTxData>;
  nodeId: string;
}

function ListItem(props: { block: BlockWithoutTxData; nodeId: string; }) {
  const { block, nodeId } = props;
  return (
    <div className="blockItemContainer">
      <div>{block.number}</div>
      <div><Link to={`/node/${nodeId}/block/${block.hash}`}>{block.hash}</Link></div>
      <div>{block.timestamp}</div>
    </div>);
}

function BlockList(props: Props) {
  const { blocks, nodeId } = props;
  return (
    <div>
      {blocks.map(b => (<ListItem key={b.number!} block={b} nodeId={nodeId}/>))}
    </div>);
}

export default BlockList;