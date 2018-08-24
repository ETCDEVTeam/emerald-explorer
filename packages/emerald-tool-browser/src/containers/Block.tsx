import * as React from 'react';
import { BlockWithTxData } from 'emerald-js';
import { BlockView } from 'emerald-tool';
import { EthRpc } from 'emerald-js-ui';

export default function Block(props: any) {
  const { history: { goBack }, match: { params: { hash } } } = props;
  return (
    <EthRpc method="eth.getBlock" params={[hash, true]}>
      {block => (<BlockView block={block} />)}
    </EthRpc>
  );
}
