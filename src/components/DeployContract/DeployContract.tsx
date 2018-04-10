import * as React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { FlatButton, FontIcon, TextFieldProps } from 'material-ui';
import { TextField } from 'redux-form-material-ui';
import { Field, reduxForm, InjectedFormProps, WrappedFieldProps, EventWithDataHandler } from 'redux-form';
import { required, number, positive, hex, privateKey } from '../validators';
import { Wallet } from 'emerald-js';

export const FORM_NAME = 'DeployContractForm';

interface Props {
  onEstimateGas: (callData: {data: string}) => Promise<number>;
  onGetAccountNonce: (address: string) => Promise<number>;
}

export interface DeployContractFormData {
  gasPrice: number;
  privateKey: string;
  gas: number;
  from?: string;
  bytecode: string;
  nonce: number;
}

export type DeployContractProps = InjectedFormProps<DeployContractFormData, Props> & Props;

const codeFieldStyle: React.CSSProperties = {
  fontFamily: 'monospace',
  letterSpacing: '.02em',
  marginTop: '5px',
  padding: '5px',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  overflow: 'auto',
  outline: '1px solid rgb(224, 224, 224)',
};

class DeployContract extends React.Component<DeployContractProps> {

  estimateGas: EventWithDataHandler<React.ChangeEvent<{}>> =
  (event?: React.ChangeEvent<{}>, value?: string) => {
    if (this.props.onEstimateGas && value) {
      this.props.onEstimateGas({data: value})
        .then((gas) => this.props.change('gas', gas));
    }
  }

  onPrivKeyChange: EventWithDataHandler<React.ChangeEvent<{}>> =
  (event?: React.ChangeEvent<{ name: string }>, value?: string, previousValue?: string) => {
    if (value) {
      try {
        const address = Wallet.fromPrivateKey(value).getAddress();
        this.props.change('from', address);
        // get nonce for calculated address
        if (this.props.onGetAccountNonce) {
          this.props.onGetAccountNonce(address).then((nonce) => this.props.change('nonce', nonce));
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  render() {
    const { handleSubmit, reset, pristine, submitting, invalid } = this.props;

    return (
      <Card>
        <CardHeader
          title="Deploy Contract"
          actAsExpander={false}
          showExpandableButton={false}
        />
        <CardText expandable={false}>
          <div>
            <div>
              <Field
                name="privateKey"
                floatingLabelText="Private key in hex format"
                type="text"
                component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
                validate={[required, privateKey]}
                onChange={this.onPrivKeyChange}
              />
            </div>
            <div>
              <Field
                name="from"
                floatingLabelText="From"
                disabled={true}
                type="text"
                component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
                validate={[required, hex]}
              />
            </div>
            <div>
              <Field
                name="nonce"
                floatingLabelText="Nonce"
                disabled={true}
                type="text"
                component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
                validate={[required]}
              />
            </div>
            <div>
              <label>Byte Code</label>
              <div>
                <Field
                  name="bytecode"
                  component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
                  rows={4}
                  rowsMax={4}
                  textareaStyle={codeFieldStyle as React.CSSProperties}
                  multiLine={true}
                  underlineShow={false}
                  type="text"
                  onChange={this.estimateGas}
                  validate={[required, hex]}
                />
              </div>
            </div>
            <div>
              <Field
                name="gasPrice"
                type="number"
                component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
                floatingLabelText="Gas Price (Wei)"
                hintText="10000"
                validate={[required, number, positive]}
              />
            </div>
            <div>
              <Field
                name="gas"
                type="number"
                component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
                floatingLabelText="Gas Amount"
                hintText="21000"
                validate={[required, number, positive]}
              />
            </div>
          </div>
          <div>
            <div>
              <Card>
                <CardHeader
                  title="Other Options"
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardText expandable={true}>
                  <div>
                    <Field
                      name="name"
                      component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
                      type="text"
                      floatingLabelText="Contract Name"
                    />
                  </div>
                  <div>
                    <Field
                      name="version"
                      type="number"
                      component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
                      floatingLabelText="Version"
                      hintText="1.0000"
                    />
                  </div>
                  <div>
                    <label>Contract ABI / JSON Interface</label>
                    <div>
                      <Field
                        name="abi"
                        component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
                        rows={2}
                        textareaStyle={codeFieldStyle as React.CSSProperties}
                        multiLine={true}
                        underlineShow={false}
                        type="text"
                      />
                    </div>
                  </div>
                </CardText>
              </Card>
            </div>
          </div>
        </CardText>
        <CardActions>
          <FlatButton
            label="Submit"
            onClick={handleSubmit}
            disabled={pristine || submitting || invalid}
          />
          <FlatButton
            label="Clear Values"
            disabled={pristine || submitting}
            onClick={reset}
          />
          <FlatButton
            label="Cancel"
            icon={<FontIcon className="fa fa-ban" />}
          />
        </CardActions>
      </Card>
    );
  }
}

const DeployContractForm = reduxForm<DeployContractFormData, Props>({ form: FORM_NAME })(DeployContract);
export default DeployContractForm;