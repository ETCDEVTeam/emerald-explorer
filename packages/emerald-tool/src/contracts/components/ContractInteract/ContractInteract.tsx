import * as React from 'react';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';

import { Contract, AbiFunction, AbiFunctionInput, AbiFunctionOutput } from '../../model';
import { OutputValue } from 'emerald-js/src/contracts';

export interface AbiFunctionInputValue {
  value?: string;
}

export interface AbiFunctionOutputValue {
  value?: string;
}

export type Input = AbiFunctionInput & AbiFunctionInputValue;

export type Output = AbiFunctionOutput & AbiFunctionOutputValue;

export interface State {
  function?: AbiFunction;
  inputs: Array<Input>;
  outputs: Array<Output>;
  selectedFunction: string;
  value?: string;
  gas?: string;
}

export interface Props {
  contract: Contract;
  onSubmit?: () => void;
  
  /**
   * This handler should eth_call smart contract's method
   */
  onCall?: (contractAddress: string, func: AbiFunction, inputs: {}) => Promise<OutputValue[]>;
}

class ContractInteract extends React.Component<Props, State> {

  state = {
    selectedFunction: '',
    function: undefined,
    inputs: [],
    outputs: [],
    value: undefined,
    gas: undefined
  }

  handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    });
  }

  handleGasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      gas: event.target.value,
    });
  }

  handleSelectFuncChange = (event: any) => {
      const { contract } = this.props;
      const functions = contract.abi!;
      const func = functions.find((f) => f.name === event.target.value);
      if (!func) {
        return;
      }

      let inputs: Array<Input>;
      let outputs: Array<Output>;
      // if constant, read directly
      if (func.inputs.length > 0) {
        inputs = func.inputs;
      } else {
        inputs = [];
      }
      if (func.constant && func.outputs.length > 0) {
        outputs = func.outputs;
      } else {
        outputs = [];
      }
      this.setState({
        inputs,
        outputs,
        function: func,
        selectedFunction: event.target.value
      });
    }

    updateInputVals = (event: React.ChangeEvent<HTMLInputElement>) => {

      const newInputs = this.state.inputs.map((input) => {
        return input.name === event.target.name ? {
          ...input,
          value: event.target.value,
        } : input;
      });

      this.setState({
        ...this.state,
        inputs: newInputs,
      });
    }

  /*
      after callContract:
        Expect return value of executed contract
        Display decoded output params
    */
  handleContractCall = () => {
    const args = this.state.inputs.reduce(
      (res, input) => {
        res[input.name] = input.value;
        return res;
      },
      {});

    const address = this.props.contract.address;

    if (this.props.onCall) {
      this.props.onCall(address, this.state.function!, args)
      .then((result) => {
        if (result.length > 0) {
          this.setState({
            ...this.state,
            outputs: result as Output[]
          });
        }
      });
    }
  }

  render() {
    const { contract, onSubmit } = this.props;
    const functions = contract.abi!;
    const func = this.state.function;
    const { outputs, inputs } = this.state;
    return (
      <Card>
        <CardContent>
          <div>
            <div>
              <Select
                value={this.state.selectedFunction}
                onChange={this.handleSelectFuncChange}
              >
                {functions.map((f: { name: string }) =>
                  <MenuItem
                    key={f.name}
                    value={f.name}
                  >
                  {f.name}
                  </MenuItem>
                )}
              </Select>
            </div>
          </div>
          <div>
            {func && inputs && inputs.map((input) =>
              <div key={`${func.name} ${input.name} IN`}>
                <TextField
                  name={input.name}
                  label={`${input.name} (${input.type})`}
                  onChange={this.updateInputVals}
                />
              </div>
            )}
            {func && outputs && outputs.map((output) =>
              <div key={`${func.name} ${output.name} OUT`}>
                <div >
                  <b>{`${output.name}`}</b> {`(${output.type})`}<br />
                  <div>{(output.value || ' ').toString()}</div>
                </div>
              </div>
            )}
          </div>{/*
          {!this.state.constant &&
            <div>
              <div>
                <Field name="from"
                  floatingLabelText="Account"
                  fullWidth={true}
                  component={SelectField}>
                  {this.props.accounts.map((account) =>
                    <MenuItem
                      key={account.get('id')}
                      value={account.get('id')}
                      primaryText={account.get('id')}
                    />
                  )}
                </Field>
              </div>
              <div>
                <Field
                  name="password"
                  floatingLabelText="Password"
                  type="password"
                  component={TextField}
                  validate={required} />
              </div>
            </div>}*/}
          {func && !func.constant && 
            <div>
              {func!.payable && 
              <div>
                <TextField
                  value={this.state.value}
                  name="value"
                  label="Value to Send"
                  onChange={this.handleValueChange}
                />
              </div>}
              <div>
                <TextField
                  name="gas"
                  label="Gas Amount"
                  onChange={this.handleGasChange}
                />
              </div>
            </div>
          }
        </CardContent>
        <CardActions>
          {func && func.constant &&
            <Button
              onClick={this.handleContractCall}
            >
            Call
            </Button>}
          {!(func && func.constant) &&
            <Button onClick={onSubmit}>Submit</Button>
          }
          <Button>Clear</Button>
        </CardActions>
      </Card>
    );
  }
}

export default ContractInteract;