import * as React from 'react';
import { InjectedFormProps, reduxForm, Field, WrappedFieldProps, EventWithDataHandler } from 'redux-form';
import { SelectFieldProps, TextFieldProps } from 'material-ui';
import { SelectField, TextField } from 'redux-form-material-ui';
import { Card, CardActions, CardText, FlatButton, MenuItem, FontIcon } from 'material-ui';
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
    (event?: React.ChangeEvent<{}>, value?: AbiFunction, previousValue?: string) => {
      if (!value) {
        return;
      }

      let inputs: Array<Input>;
      let outputs: Array<Output>;
      // if constant, read directly
      if (value.inputs.length > 0) {
        inputs = value.inputs;
      } else {
        inputs = [];
      }
      if (value.constant && value.outputs.length > 0) {
        outputs = value.outputs;
      } else {
        outputs = [];
      }
      this.setState({
        inputs,
        outputs,
        function: value,
      });
    }

  updateInputVals: EventWithDataHandler<React.ChangeEvent<{}>> =
    (event?: React.ChangeEvent<{ name: string }>, value?: AbiFunction, previousValue?: string) => {
      const idx = this.state.inputs.findIndex((input) => input.name === event!.target.name);
      if (idx >= 0) {
        // this.setState({
        //   inputs: this.state.inputs.update(idx, (input) => input.set('value', value)),
        // });
      }
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
          this.setState({ outputs: result as Output[] });
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
        <CardText>
          <div>
            <div>
              <Field
                name="selectedFunction"
                component={SelectField as React.ComponentType<WrappedFieldProps & SelectFieldProps>}
                onChange={this.changeInputs}
              >
                {functions.map((f: { name: string }) =>
                  <MenuItem
                    key={f.name}
                    value={f}
                    label={f.name}
                    primaryText={f.name}
                  />
                )}
              </Field>
            </div>
          </div>
          <div>
            {func && inputs && inputs.map((input) =>
              <div key={`${func.name} ${input.name} IN`}>
                <Field
                  name={input.name}
                  floatingLabelText={`${input.name} (${input.type})`}
                  hintText={input.type}
                  component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
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
                  floatingLabelText="Value to Send"
                  hintText="0"
                  component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>} 
                />
              </div>}
              <div>
                <Field
                  name="gas"
                  floatingLabelText="Gas Amount"
                  component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
                  validate={[required, number]} 
                />
              </div>
            </div>
          }
        </CardText>
        <CardActions>
          {func && func.constant &&
            <FlatButton
              label="Submit"
              disabled={pristine || this.props.submitting || this.props.invalid}
              onClick={this.onCallContract}
              icon={<FontIcon className="fa fa-check" />}
            />}
          {!(func && func.constant) &&
            <FlatButton
              label="Submit"
              disabled={pristine || this.props.submitting || this.props.invalid}
              onClick={handleSubmit}
              icon={<FontIcon className="fa fa-check" />}
            />}
          <FlatButton
            label="Clear"
            onClick={reset}
            icon={<FontIcon className="fa fa-ban" />}
          />
        </CardActions>
      </Card>
    );
  }
}

const ContractInteractForm = reduxForm<FormData, Props>({ form: 'ContractInteractForm' })(ContractInteract);
export default ContractInteractForm;