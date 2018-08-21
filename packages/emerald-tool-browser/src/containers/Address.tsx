import * as React from 'react';
import { match } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../store/types';
import { Node } from '../store/nodes/model';
import { AddressView } from 'emerald-tool';
import Wei from 'emerald-js/lib/wei';
import { EthRpc } from 'emerald-js-ui';

interface Props {
  match: { params: { address: string } };
}

class Address extends React.Component<Props> {
  render() {
    const { address } = this.props.match.params;
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
                    balance={new Wei(balance || 0).getEther()}
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
}

export default Address;
