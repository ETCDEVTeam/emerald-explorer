import * as React from 'react';
import { BlockWithTxData } from 'emerald-js';
import TxList from '../TxList';

interface Props {
  block: BlockWithTxData;
  baseUrl: string;
}

function BlockView(props: Props) {
    const { block, baseUrl } = props;
    if (!block) {
      return (<div>Loading...</div>);
    }

    return (
      <div>
        <table>
          <tr><td>Hash</td><td>{block.hash}</td></tr>
          <tr><td>Number</td><td>{block.number}</td></tr>
          <tr><td>ParentHash</td><td>{block.parentHash}</td></tr>
          <tr><td>Nonce</td><td>{block.nonce}</td></tr>
          <tr><td>Difficulty</td><td>{block.difficulty.toString()}</td></tr>
          <tr><td>ExtraData</td><td>{block.extraData}</td></tr>
        </table>
        <TxList transactions={block.transactions} baseUrl={baseUrl}/>
      </div>
    );
}

export default BlockView;