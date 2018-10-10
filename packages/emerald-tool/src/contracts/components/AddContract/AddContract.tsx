import * as React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { required, address as isAddress, isJson } from '../validators';

export interface AddContractProps {
  onDeployNewContract: () => void;
  onAddContract: (address: string, name: string, abi: string) => void;
}

export interface AddContractState {
  name: string;
  address: string;
  abi: string;
}

class AddContract extends React.Component<AddContractProps, AddContractState> {

  constructor(props: AddContractProps) {
    super(props);
  }

  handleSubmit = () => {
    const { address, name, abi } = this.state;
    if (this.props.onAddContract) {
      this.props.onAddContract(address, name, abi);
    }
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: event.target.value,
    })
  }

  handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      address: event.target.value,
    })
  }

  handleAbiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      abi: event.target.value,
    })
  }

  render() {
    const { onDeployNewContract } = this.props;
    const { name, address, abi } = this.state;
    const isEnabled = !isJson(abi) && !isAddress(address);

    return (
      <Card>
        <CardHeader
          title="Add Contract"
        />
        <CardContent>
          <div>
            <TextField
              name="name"
              label="Contract Name (optional)"
              onChange={this.handleNameChange}
              value={name}
            />
          </div>
          <div>
            <TextField
              name="address"
              label="Contract Address"
              onChange={this.handleAddressChange}
              value={address} 
            />
          </div>
          <div>
            <TextField
              multiline={true}
              rowsMax={10}
              rows={5}
              name="abi"
              label="Contract ABI / JSON Interface"
              value={abi}
              onChange={this.handleAbiChange} 
            />
          </div>
          <div>
            <Button
              onClick={this.handleSubmit}
              disabled={!isEnabled}
            >
              Submit
            </Button>
            <Button>
              Clear Values
            </Button>
          </div>
        </CardContent>
        <CardActions>
          <Button onClick={onDeployNewContract}>Deploy New Contract</Button>
        </CardActions>
      </Card>
    );
  }
}

export default AddContract;