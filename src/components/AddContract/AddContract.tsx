import * as React from 'react';
import { InjectedFormProps, reduxForm, Field } from 'redux-form';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Add as AddIcon } from 'emerald-js-ui/lib/icons2';
import { required, address, isJson } from '../validators';

export interface AddContractProps {
  onDeployNewContract: () => void;
}

export interface AddContractFormData {
  name: string;
  address: string;
  abi: string;
}

export type AddContractFormProps = InjectedFormProps<AddContractFormData, AddContractProps> & AddContractProps;

class AddContract extends React.PureComponent<AddContractFormProps> {

  render() {
    const { handleSubmit, submitting, pristine, invalid, reset } = this.props;
    const { onDeployNewContract } = this.props;

    return (
      <Card>
        <CardHeader
          title="Add Contract"
          actAsExpander={false}
          showExpandableButton={false}
        />

        <CardText expandable={false}>
          <form onSubmit={handleSubmit}>
          <div>
            <Field
              name="name"
              component="input"
              type="text"
              label="Contract Name (optional)" 
            />
          </div>
          <div>
            <Field
              name="address"
              component="input"
              type="text"
              label="Contract Address"
              validate={[required, address]} 
            />
          </div>
          <div>
            <Field
              name="abi"
              component="textarea"
              rows={10}
              type="text"
              label="Contract ABI / JSON Interface"
              validate={[required, isJson]} 
            />
          </div>
          <div>
            <FlatButton
              label="Submit"
              type="submit"
              disabled={pristine || submitting || invalid}
            />
            <FlatButton
              label="Clear Values"
              disabled={pristine || submitting}
              onClick={reset}
            />
          </div>
          </form>
        </CardText>
        <CardActions>
          <FlatButton
            label="Deploy New Contract"
            icon={<AddIcon />}
            onClick={onDeployNewContract}
          />
        </CardActions>
      </Card>
    );
  }
}

const AddContractForm = reduxForm<AddContractFormData, AddContractProps>({ form: 'AddContractForm' })(AddContract);
export default AddContractForm;