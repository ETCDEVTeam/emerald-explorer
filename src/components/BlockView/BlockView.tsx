import * as React from 'react';
import { Link } from 'react-router-dom';
import { BlockWithTxData } from 'emerald-js';
import TxList from '../TxList';

interface Props {
  block: BlockWithTxData;
  baseUrl: string;
}

function BlockView(props: Props) {
    console.log(JSON.stringify(props.block));
    const { block, baseUrl } = props;
    if (!block) {
      return (<div>Loading...</div>);
    }

    return (
      <React.Fragment>
      <div><Link to={`${baseUrl}`}>Node</Link></div>
      <div>
        <table>
          <tr><td>Number</td><td>{block.number}</td></tr>
          <tr><td>Timestamp</td><td>{block.timestamp}</td></tr>
          <tr><td>Hash</td><td>{block.hash}</td></tr>
          <tr><td>ParentHash</td><td>{block.parentHash}</td></tr>
          <tr><td>Miner</td><td>{block.miner}</td></tr>
          <tr><td>Nonce</td><td>{block.nonce}</td></tr>
          <tr><td>Difficulty</td><td>{block.difficulty.toString()}</td></tr>
          <tr><td>ExtraData</td><td>{block.extraData}</td></tr>
          <tr><td>State Root</td><td>{block.stateRoot}</td></tr>
          <tr><td>Transactions Root</td><td>{block.transactionsRoot}</td></tr>
          <tr><td>Receipts Root</td><td>{block.receiptsRoot}</td></tr>
        </table>
        <TxList transactions={block.transactions} baseUrl={baseUrl}/>
      </div>
      </React.Fragment>
    );
}

export default BlockView;