import * as React from 'react';
// import { Link } from 'react-router-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import LibraryBooks from 'material-ui/svg-icons/av/library-books';
import Avatar from 'material-ui/Avatar';
import { Node } from '../../store/nodes/model';
import { Contract } from '../../store/contracts/model';

// import { Block as BlockIcon } from 'emerald-js-ui/lib/icons2';
// import { Card, Warning, WarningText } from 'emerald-js-ui';

interface Props {
  node: Node;
  contracts: Array<Contract>;
}

function ContractItem(props: { contract: Contract }) {
  return (
    <TableRow selectable={false}>
      <TableRowColumn>
        <span>
          {props.contract.name}
        </span>
      </TableRowColumn>
      <TableRowColumn>
        <span>
          {props.contract.address}
        </span>
      </TableRowColumn>
    </TableRow>
  );
}

function ContractList(props: Props) {

  const table = (
    <Table selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Contract</TableHeaderColumn>
          <TableHeaderColumn>Address</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {props.contracts.map((contract) => <ContractItem key={contract.address} contract={contract} />)}
      </TableBody>
    </Table>);

  const titleStyle = {
    fontSize: '20px',
  };
  const titleAvatar = <Avatar icon={<LibraryBooks />} />;

  return (
    <Card>
      <CardHeader
        title="Contracts List"
        titleStyle={titleStyle}
        subtitle="List of installed contracts"
        avatar={titleAvatar}
        actAsExpander={false}
        showExpandableButton={false}
      />
      <CardText expandable={false}>
        {table}
      </CardText>
    </Card>
  );
}

export default ContractList;