import * as React from 'react';
import BlockList from './BlockList';
import { EthRpc } from 'emerald-js-ui';

interface Props {
  history: { goBack: () => any };
}

export default function NodeView(props: any) {
  const { history } = props;
  return (
    <EthRpc method="eth.getBlockNumber">
      {blockNumber => (<BlockList from={Math.max(blockNumber - 15, 0)} to={blockNumber} />)}
    </EthRpc>
  );
}
