import * as React from 'react';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import { Button, TextField } from 'material-ui';
import InteractContract from '../ContractInteract';
import { Contract } from '../../store/contracts/model';
import { Node } from '../../store/nodes/model';

export interface Props {
  contract: Contract;
  node: Node;
}

function ContractView(props: Props) {
  const { contract, node } = props;
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
        <InteractContract contract={contract} node={node} />
      </CardContent>
    </Card>
  );
}

export default ContractView;