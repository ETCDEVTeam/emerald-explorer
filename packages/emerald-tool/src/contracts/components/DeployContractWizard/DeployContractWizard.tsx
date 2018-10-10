import * as React from 'react';
import { Wallet } from 'emerald-js';
import CreateDeployTx from './CreateDeployTx';
import SignedDeployTx from './SignedDeployTx';

export interface Props {
  onEstimateGas?: (callData: {from: string, data: string, gas: number}) => Promise<number>;
  onGetAccountNonce?: (address: string) => Promise<number>;
  onCreateSignedTx?: (txData: {}, privKey: string) => void;
  onSendTx?: (signedRawTx: string) => Promise<string>;
  gasPrice?: number;
  chainId: number;
}

export interface State {
  signedTx?: string;
  tx?: {};
  txHash?: string;
}

class DeployContractWizard extends React.Component<Props, State> {
  state = {
    signedTx: undefined,
    tx: undefined,
    txHash: undefined
  }

  createSignedTx = (txData: {nonce: number, data: string, gas: number, gasPrice: number}, privKey: string) => {
    // Create contract transaction
    const tx = {
      data: txData.data,
      nonce: txData.nonce,
      gasPrice: txData.gasPrice,
      gasLimit: txData.gas,
      value: 0,
      chainId: this.props.chainId,
    };

    const wallet = Wallet.fromPrivateKey(privKey);
    const signedTx = wallet.signTx(tx);
    this.setState({
      signedTx,
      tx,
    });
    console.log(JSON.stringify(tx));
  }

  sendTx = () => {
    const { signedTx } = this.state;
    const { onSendTx } = this.props;
    if (onSendTx && signedTx) {
      onSendTx(signedTx)
        .then(hash => this.setState({
          ...this.state,
          txHash: hash,
        }));
    }
  }

  render() {
    const { tx, signedTx, txHash } = this.state;
    return (
      <React.Fragment>
        <CreateDeployTx
          gasPrice={this.props.gasPrice}
          onEstimateGas={this.props.onEstimateGas}
          onCreateSignedTx={this.createSignedTx}
          onGetAccountNonce={this.props.onGetAccountNonce}
        />
        { tx && signedTx &&
          <SignedDeployTx
            signedTx={signedTx}
            tx={tx}
            onSendTx={this.sendTx}
          />
        }
        <div>{txHash}</div>
      </React.Fragment>);
  }
}

export default DeployContractWizard;