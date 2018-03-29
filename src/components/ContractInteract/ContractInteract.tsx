import * as React from 'react';
import { InjectedFormProps, reduxForm, Field, WrappedFieldProps } from 'redux-form';
import { SelectFieldProps } from 'material-ui';
import { SelectField } from 'redux-form-material-ui';
import { Card, CardActions, CardText, FlatButton, MenuItem, FontIcon } from 'material-ui';
import { Contract } from '../../store/contracts/model';
// import { required, number } from '../validators';

interface State {
  function?: string;
  constant: boolean;
  payable: boolean;
}

interface Props {
  contract: Contract;
}

export interface FormData {
}

export type ContractInteractProps = InjectedFormProps<FormData, Props> & Props;

class ContractInteract extends React.Component<ContractInteractProps, State> {
  constructor(props: ContractInteractProps) {
    super(props);
    this.state = {
      // inputs: [],
      // outputs: [],
      function: undefined,
      constant: true,
      payable: false,
    };
  }

  changeInputs(/*event, value, prev*/) {
    // let inputs;
    // let outputs;
    // // if constant, read directly
    // if (value.get('inputs').size > 0) {
    //   inputs = value.get('inputs').map((input) => Immutable.fromJS(input));
    // } else {
    //   inputs = [];
    // }
    // if (value.get('constant') && value.get('outputs').size > 0) {
    //   outputs = value.get('outputs').map((output) => Immutable.fromJS(output));
    // } else {
    //   outputs = [];
    // }
    // this.setState({
    //   inputs,
    //   outputs,
    //   function: value,
    //   constant: value.get('constant'),
    //   payable: value.get('payable'),
    // });
  }

  // updateInputVals(event, value, prev) {
  //   const idx = this.state.inputs.findKey((input) => input.get('name') === event.target.name);
  //   if (idx >= 0) {
  //     this.setState({
  //       inputs: this.state.inputs.update(idx, (input) => input.set('value', value)),
  //     });
  //   }
  // }

  /*
      after callContract:
        Expect return value of executed contract
        Display decoded output params
    */
  // callContract() {
  //   const args = this.state.inputs.reduce((res, input) => {
  //     res[input.get('name')] = input.get('value');
  //     return res;
  //   }, {});

  //   const address = this.props.contract.address;

  //   if (this.state.constant) {
  //     return new Promise((resolve, reject) => {
  //       this.props.dispatch(callContract(address,
  //         this.state.function,
  //         args
  //       )).then((result) => {
  //         if (result.size > 0) {
  //           const cleanDecode = result.map((res) => Immutable.fromJS(res));
  //           this.setState({ outputs: cleanDecode });
  //           resolve();
  //         }
  //       });
  //     });
  //   }
  // }

  render() {
    const { contract, reset/*, handleSubmit*/ } = this.props;
    const functions = JSON.parse(contract.abi!);

    return (
      <Card>
        <CardText>
          <div>
            <div>
              <Field
                name="function"
                component={SelectField as React.ComponentType<WrappedFieldProps & SelectFieldProps>}
                onChange={this.changeInputs}
              >
                {functions.map((func: {name: string}) =>
                  <MenuItem
                    key={func.name}
                    value={func}
                    label={func.name}
                    primaryText={func.name}
                  />
                )}
              </Field>
            </div>
          </div>
          {/* <div>
            {this.state.inputs && this.state.inputs.map((input) =>
              <Col xs={6} key={`${this.state.function.get('name')} ${input.get('name')} IN`}>
                <Field
                  name={input.get('name')}
                  floatingLabelText={`${input.get('name')} (${input.get('type')})`}
                  hintText={input.get('type')}
                  component={TextField}
                  onChange={this.updateInputVals}
                />
              </Col>
            )}
            {this.state.outputs && this.state.outputs.map((output) =>
              <Col xs={6} key={`${this.state.function.get('name')} ${output.get('name')} OUT`}>
                <div >
                  <b>{`${output.get('name')}`}</b> {`(${output.get('type')})`}<br />
                  <div>{(output.get('value') || ' ').toString()}</div>
                </div>
              </Col>
            )}
          </div>
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
            </div>}
          {!this.state.constant &&
            <div>
              {this.state.payable && <Col xs={8}>
                <Field 
                  name="value"
                  floatingLabelText="Value to Send"
                  hintText="0"
                  component={TextField} 
                />
              </Col>}
              <Col xs={8}>
                <Field
                  name="gas"
                  floatingLabelText="Gas Amount"
                  component={TextField}
                  validate={[required, number]} />
              </Col>
            </div>} */}
        </CardText>
        <CardActions>
          {this.state.constant &&
            <FlatButton
              label="Submit"
              disabled={this.props.pristine || this.props.submitting || this.props.invalid}
              // onClick={this.callContract}
              icon={<FontIcon className="fa fa-check" />} 
            />}
          {!this.state.constant && 
          
          <FlatButton
            label="Submit"
            disabled={this.props.pristine || this.props.submitting || this.props.invalid}
            onClick={this.props.handleSubmit}
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