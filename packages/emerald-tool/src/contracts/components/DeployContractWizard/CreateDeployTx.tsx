import * as React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Wallet } from '@emeraldplatform/emerald-js';

export interface Props {
  onEstimateGas?: (callData: {from: string, data: string, gas: number}) => Promise<number>;
  onGetAccountNonce?: (address: string) => Promise<number>;
  onCreateSignedTx?: (txData: {}, privKey: string) => void;
  gasPrice?: number;
}

export interface State {
  privKey?: string;
  from?: string;
  gasPrice?: number;
  byteCode?: string;
  gas?: number;
  nonce: number;
  error?: string;
}

class CreateDeployTx extends React.Component<Props, State> {
  state = {
    privKey: '',
    byteCode: '',
    gasPrice: this.props.gasPrice,
    gas: 30000,
    nonce: 0,
    from: undefined,
    error: undefined
  }

  estimateGas = async () => {
    try {
      const { from, byteCode, gas } = this.state;
      const { onEstimateGas } = this.props;
      if (onEstimateGas && from && byteCode && gas) {
        const esitamedGasLimit = await onEstimateGas({from, data: byteCode, gas});
        this.setState({...this.state, gas: esitamedGasLimit});
      }
    } catch (err) {
      this.setState({
        ...this.state,
        error: JSON.stringify(err),
      });
    }
  }

  getNonce = async () => {
    try {
      const { from } = this.state;
      const { onGetAccountNonce } = this.props;
      if (from && onGetAccountNonce) {
        const nonce = await onGetAccountNonce(from);
        this.setState({
          ...this.state,
          nonce,
        });
      }
    } catch (err) {
      this.setState({
        ...this.state,
        error: JSON.stringify(err),
      });
    }
  }

  createTx = () => {
    const { onCreateSignedTx } = this.props;
    const { byteCode, gas, gasPrice, nonce, privKey } = this.state;
    const txData = {
      data: byteCode,
      gas,
      gasPrice,
      nonce,
    };

    if (onCreateSignedTx && privKey) {
      onCreateSignedTx(txData, privKey);
    }
  }

  onGasPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      gasPrice: Number(event.target.value),
    });
  }

  onByteCodeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      byteCode: event.target.value,
    });
  }

  onGasChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      gas: Number(event.target.value),
    });
  }

  onNonceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      nonce: Number(event.target.value),
    });
  }

  onPrivKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let address;
    try {
      address = Wallet.fromPrivateKey(event.target.value).getAddress();
    } catch (err) {
      console.error(err);
    }

    this.setState({
      ...this.state,
      privKey: event.target.value,
      from: address,
    });
  }

  render() {
    const { from, error } = this.state;
    return (
      <div>
        <div>Private key</div>
        <div>
          <TextField
            required={true}
            value={this.state.privKey}
            onChange={this.onPrivKeyChange}
          />
        </div>
        <div>{from}</div>
        <div>Byte Code</div>
        <div>
          <TextField
            required={true}
            rows={4}
            rowsMax={4}
            multiline={true}
            onChange={this.onByteCodeChanged}
          />
        </div>
        <div>Nonce <Button onClick={this.getNonce}>Get</Button></div>
        <div>
          <TextField
            value={this.state.nonce}
            onChange={this.onNonceChange}
          />
        </div>
        <div>Gas Price</div>
        <div>
          <TextField
            value={this.state.gasPrice}
            onChange={this.onGasPriceChange}
          />
        </div>
        <div>Gas <Button onClick={this.estimateGas}>Estimate</Button></div>
        <div>
          <TextField
            value={this.state.gas}
            onChange={this.onGasChanged}
          />
        </div>
        <div>
          <Button onClick={this.createTx}>Create Transaction</Button>
        </div>
        <div>{error}</div>
      </div>
    );
  }
}

export default CreateDeployTx;