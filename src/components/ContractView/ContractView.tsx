import * as React from 'react';
import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card';
import { FlatButton, FontIcon } from 'material-ui';
// import InteractContract from './interactForm';
import { Contract } from '../../store/contracts/model';

export interface Props {
  contract: Contract;
}

function ContractView(props: Props) {
  const { contract } = props;
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
            {JSON.stringify(contract.abi)}
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
        {/* <InteractContract contract={contract} /> */}
      </CardText>
    </Card>
  );
}

export default ContractView;