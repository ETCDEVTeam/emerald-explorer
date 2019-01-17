import * as React from 'react';
import { AddressView } from 'emerald-tool';
import { Wei } from '@emeraldplatform/emerald-js';
import { EthRpc } from '@emeraldplatform/ui';

export default function Address(props: any) {
  const { address } = props.match.params;
  return (
    <EthRpc method="eth.getTransactionCount" params={[address]}>
      {transactionCount => (
        <EthRpc method="eth.getBalance" params={[address]}>
          {balance => (
            <EthRpc method="eth.getCode" params={[address]}>
              {code => (
                <AddressView
                  address={address}
                  txCount={transactionCount}
                  balance={new Wei(balance || 0).getEther(5)}
                  code={code}
                />
              )}
            </EthRpc>
          )}
        </EthRpc>
      )}
    </EthRpc>
  );
}
