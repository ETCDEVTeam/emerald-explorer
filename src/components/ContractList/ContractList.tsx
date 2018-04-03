import * as React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import LibraryBooks from 'material-ui/svg-icons/av/library-books';
import Avatar from 'material-ui/Avatar';
import { Node } from '../../store/nodes/model';
import { Contract } from '../../store/contracts/model';

interface Props {
  node: Node;
  contracts: Array<Contract>;
}

function ContractItem(props: { contract: Contract, baseUrl: string }) {
  return (
    <TableRow selectable={false}>
      <TableRowColumn>
        <span>
          {props.contract.name}
        </span>
      </TableRowColumn>
      <TableRowColumn>
        <Link to={`${props.baseUrl}/contracts/${props.contract.address}`}>
          {props.contract.address}
        </Link>
      </TableRowColumn>
    </TableRow>
  );
}

function ContractList(props: Props) {
  const { node, contracts } = props;
  const table = (
    <Table selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Contract</TableHeaderColumn>
          <TableHeaderColumn>Address</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {contracts.map((contract) => 
          <ContractItem key={contract.address} contract={contract} baseUrl={`/node/${node.id}`} />)}
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