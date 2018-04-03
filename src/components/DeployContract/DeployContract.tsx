import * as React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { FlatButton, FontIcon, TextFieldProps } from 'material-ui';
import { TextField } from 'redux-form-material-ui';
import { Field, reduxForm, InjectedFormProps, WrappedFieldProps } from 'redux-form';
import { required, number, positive, hex } from '../validators';

interface Props {

}

interface FormData {
  gasPrice: number;
  gas: number;
}

export type DeployContractProps = InjectedFormProps<FormData, Props> & Props;

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
              floatingLabelText="Private key"
              type="password"
              component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
              validate={required} 
            />
            <Field 
              name="bytecode"
              component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
              rows={4}
              textareaStyle={codeFieldStyle as React.CSSProperties}
              multiLine={true}
              type="text"
              label="Bytecode"
              // onChange={estGas}
              validate={[required, hex]}
            />
            <Field
              name="gasPrice"
              type="number"
              component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
              floatingLabelText="Gas Price (MGas)"
              hintText="10000"
              validate={[required, number, positive]}
            />
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
                <Field 
                  name="name"
                  component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
                  type="text"
                  floatingLabelText="Contract Name" 
                />
                <Field 
                  name="version"
                  type="number"
                  component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
                  floatingLabelText="Version"
                  hintText="1.0000"
                />
                <Field
                  name="abi"
                  component={TextField as React.ComponentType<WrappedFieldProps & TextFieldProps>}
                  rows={2}
                  textareaStyle={codeFieldStyle as React.CSSProperties}
                  multiLine={true}
                  type="text"
                  label="Contract ABI / JSON Interface"
                />
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

const DeployContractForm = reduxForm<FormData, Props>({ form: 'DeployContractForm' })(DeployContract);
export default DeployContractForm;