import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { OutputValue } from 'emerald-js/src/contracts';
import ContractInteract from '../ContractInteract';
import { Contract, AbiFunction } from '../../model';

export interface Props {
  contract: Contract;
  onContractCall?: (contractAddress: string, func: AbiFunction, inputs: {}) => Promise<OutputValue[]>;
}

function ContractView(props: Props) {
  const { contract, onContractCall } = props;
  return (
    <Card>
      <CardHeader
        title={`Contract: ${contract.name}`}
        subheader={contract.address}
      />
      <CardContent>
        <table>
          <tbody>
          <tr>
            <td>Version: </td>
            <td>{contract.version}</td>
          </tr>
          <tr>
            <td>Options: </td>
            <td>{contract.options}</td>
          </tr>
          <tr>
            <td>Creation Transaction: </td>
            <td>{contract.txHash}</td>
          </tr>
          </tbody>
        </table>
        <div>
          <b>ABI / JSON Interface</b>
          <div>
            <TextField
              disabled={true}
              multiline={true}
              rowsMax={4}
              rows={4}
              value={JSON.stringify(contract.abi)}
            />
          </div>
        </div>
      </CardContent>
      <CardHeader>
        <Button>Access Contract</Button>
      </CardHeader>
      <CardContent>
        <ContractInteract
          contract={contract}
          onCall={onContractCall}
        />
      </CardContent>
    </Card>
  );
}

export default ContractView;