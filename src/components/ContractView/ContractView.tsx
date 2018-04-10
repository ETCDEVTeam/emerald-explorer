import * as React from 'react';
import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card';
import { FlatButton, FontIcon, TextField } from 'material-ui';
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
        subtitle={contract.address}
      />
      <CardText>
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
              multiLine={true}
              rowsMax={4}
              rows={4}
              underlineShow={false}
              value={JSON.stringify(contract.abi)}
            />
          </div>
        </div>
      </CardText>
      <CardTitle actAsExpander={true}>
        <FlatButton
          label="Access Contract"
          icon={<FontIcon className="fa fa-arrow-circle-o-right" />}
        />
      </CardTitle>
      <CardText expandable={true}>
        <InteractContract contract={contract} node={node} />
      </CardText>
    </Card>
  );
}

export default ContractView;