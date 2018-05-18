import * as React from 'react';
import { InjectedFormProps, reduxForm, Field, WrappedFieldProps, EventWithDataHandler } from 'redux-form';
import { SelectProps } from 'material-ui/Select';
import { Select, TextField } from 'redux-form-material-ui';
import { Card, CardActions, CardContent, Button, MenuItem } from 'material-ui';
import { Contract, AbiFunction, AbiFunctionInput, AbiFunctionOutput } from '../../store/contracts/model';
import { Node } from '../../store/nodes/model';
import { required, number } from '../validators';
import { callContract } from './utils';

interface AbiFunctionInputValue {
  value?: string;
}

interface AbiFunctionOutputValue {
  value?: string;
}

type Input = AbiFunctionInput & AbiFunctionInputValue;

type Output = AbiFunctionOutput & AbiFunctionOutputValue;

interface State {
  function?: AbiFunction;
  inputs: Array<Input>;
  outputs: Array<Output>;
}

interface Props {
  contract: Contract;
  node: Node;
}

export interface FormData {
  selectedFunction: AbiFunction;
  value?: number;
  gas?: number;
}

export type ContractInteractProps = InjectedFormProps<FormData, Props> & Props;

class ContractInteract extends React.Component<ContractInteractProps, State> {
  constructor(props: ContractInteractProps) {
    super(props);
    this.state = {
      function: undefined,
      inputs: [],
      outputs: [],
    };
  }

  changeInputs: EventWithDataHandler<React.ChangeEvent<{}>> =
    (event?: React.ChangeEvent<{}>, value?: string, previousValue?: string) => {
      const { contract } = this.props;
      const functions = contract.abi!;
      const func = functions.find((f) => f.name === value);
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
      });
    }

    updateInputVals: EventWithDataHandler<React.ChangeEvent<{}>> =
    (event?: React.ChangeEvent<{ name: string }>, value?: string, previousValue?: string) => {

      const newInputs = this.state.inputs.map((input) => {
        return input.name === event!.target.name ? {
          ...input,
          value,
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
  onCallContract = () => {
    const args = this.state.inputs.reduce(
      (res, input) => {
        res[input.name] = input.value;
        return res;
      },
      {});

    const address = this.props.contract.address;

    callContract(this.props.node.rpc!, address, this.state.function!, args)
      .then((result) => {
        if (result.length > 0) {
          this.setState({
            ...this.state,
            outputs: result as Output[]
          });
        }
      });
  }

  render() {
    const { contract, reset, handleSubmit, pristine } = this.props;
    const functions = contract.abi!;
    const func = this.state.function;
    const { outputs, inputs } = this.state;
    return (
      <Card>
        <CardContent>
          <div>
            <div>
              <Field
                name="selectedFunction"
                component={Select as React.ComponentType<WrappedFieldProps & SelectProps>}
                onChange={this.changeInputs}
              >
                {functions.map((f: { name: string }) =>
                  <MenuItem
                    key={f.name}
                    value={f.name}
                  >
                  {f.name}
                  </MenuItem>
                )}
              </Field>
            </div>
          </div>
          <div>
            {func && inputs && inputs.map((input) =>
              <div key={`${func.name} ${input.name} IN`}>
                <Field
                  name={input.name}
                  label={`${input.name} (${input.type})`}
                  // hintText={input.type}
                  /* tslint:disable-next-line */
                  component={TextField as any}
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
                <Field 
                  name="value"
                  label="Value to Send"
                  hintText="0"
                  /* tslint:disable-next-line */
                  component={TextField as any} 
                />
              </div>}
              <div>
                <Field
                  name="gas"
                  label="Gas Amount"
                  /* tslint:disable-next-line */
                  component={TextField as any}
                  validate={[required, number]} 
                />
              </div>
            </div>
          }
        </CardContent>
        <CardActions>
          {func && func.constant &&
            <Button
              disabled={pristine || this.props.submitting || this.props.invalid}
              onClick={this.onCallContract}
            >
            Submit
            </Button>}
          {!(func && func.constant) &&
            <Button
              disabled={pristine || this.props.submitting || this.props.invalid}
              onClick={handleSubmit}
            >
            Submit
            </Button>}
          <Button onClick={reset}>Clear</Button>
        </CardActions>
      </Card>
    );
  }
}

const ContractInteractForm = reduxForm<FormData, Props>({ form: 'ContractInteractForm' })(ContractInteract);
export default ContractInteractForm;