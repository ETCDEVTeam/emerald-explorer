import * as React from 'react';
import { InjectedFormProps, reduxForm, Field } from 'redux-form';
import Button from 'material-ui/Button';
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card';
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
        />
        <CardContent>
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
            <Button
              type="submit"
              disabled={pristine || submitting || invalid}
            >
              Submit
            </Button>
            <Button
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear Values
            </Button>
          </div>
          </form>
        </CardContent>
        <CardActions>
          <Button onClick={onDeployNewContract}>Deploy New Contract</Button>
        </CardActions>
      </Card>
    );
  }
}

const AddContractForm = reduxForm<AddContractFormData, AddContractProps>({ form: 'AddContractForm' })(AddContract);
export default AddContractForm;