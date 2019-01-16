import * as React from 'react';
import { Transaction, TransactionReceipt } from '@emeraldplatform/emerald-js';
import { TxView } from 'emerald-tool';
import { EthRpc } from '@emeraldplatform/ui';

export default function TransactionContainer(props: any) {
  const {hash} = props.match.params;

  return (
    <EthRpc method="eth.getTransaction" params={[hash]}>
      {transaction => (
        <EthRpc method="eth.getTransactionReceipt" params={[hash]}>
          {receipt => (<TxView tx={transaction} receipt={receipt} />)}
        </EthRpc>
      )}
    </EthRpc>
  );
}
