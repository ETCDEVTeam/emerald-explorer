import * as React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { Wallet } from 'emerald-js';

interface Props {
  onEstimateGas?: (callData: {from: string, data: string, gas: number}) => Promise<number>;
  onGetAccountNonce?: (address: string) => Promise<number>;
  onCreateSignedTx?: (txData: {}, privKey: string) => void;
  gasPrice?: number;
}

interface State {
  privKey?: string;
  from?: string;
  gasPrice?: number;
  byteCode?: string;
  gas?: number;
  nonce: number;
  error?: string;
}

class CreateDeployTx extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      privKey: '',
      byteCode: '',
      gasPrice: this.props.gasPrice,
      gas: 30000,
      nonce: 0,
    };
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

  onGasPriceChange = (e: React.FormEvent<{}>, newValue: string) => {
    this.setState({
      ...this.state,
      gasPrice: Number(newValue),
    });
  }

  onByteCodeChanged = (e: React.FormEvent<{}>, newValue: string) => {
    this.setState({
      ...this.state,
      byteCode: newValue,
    });
  }

  onGasChanged = (e: React.FormEvent<{}>, newValue: string) => {
    this.setState({
      ...this.state,
      gas: Number(newValue),
    });
  }

  onNonceChange = (e: React.FormEvent<{}>, newValue: string) => {
    this.setState({
      ...this.state,
      nonce: Number(newValue),
    });
  }

  onPrivKeyChange = (e: React.FormEvent<{}>, newValue: string) => {
    let address;
    try {
      address = Wallet.fromPrivateKey(newValue).getAddress();
    } catch (err) {
      console.error(err);
    }

    this.setState({
      ...this.state,
      privKey: newValue,
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
            multiLine={true}
            onChange={this.onByteCodeChanged}
          />
        </div>
        <div>Nonce <RaisedButton onClick={this.getNonce}>Get</RaisedButton></div>
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
        <div>Gas <RaisedButton onClick={this.estimateGas}>Estimate</RaisedButton></div>
        <div>
          <TextField
            value={this.state.gas}
            onChange={this.onGasChanged}
          />
        </div>
        <div>
          <RaisedButton onClick={this.createTx}>Create Transaction</RaisedButton>
        </div>
        <div>{error}</div>
      </div>
    );
  }
}

export default CreateDeployTx;