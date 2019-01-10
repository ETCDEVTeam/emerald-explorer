import * as React from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';

import { Node } from '../../store/nodes/model';
import { Contract } from '../../store/contracts/model';

interface Props {
  node: Node;
  contracts: Array<Contract>;
}

function ContractItem(props: { contract: Contract, baseUrl: string }) {
  return (
    <TableRow>
      <TableCell>
        <span>
          {props.contract.name}
        </span>
      </TableCell>
      <TableCell>
        <Link to={`${props.baseUrl}/contracts/${props.contract.address}`}>
          {props.contract.address}
        </Link>
      </TableCell>
    </TableRow>
  );
}

function ContractList(props: Props) {
  const { node, contracts } = props;
  const table = (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Contract</TableCell>
          <TableCell>Address</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {contracts.map((contract) => 
          <ContractItem key={contract.address} contract={contract} baseUrl={`/node/${node.id}`} />)}
      </TableBody>
    </Table>);

  // const titleStyle = {
  //   fontSize: '20px',
  // };
  const titleAvatar = <Avatar />;

  return (
    <Card>
      <CardHeader
        title="Contracts List"
        // titleStyle={titleStyle}
        subheader="List of installed contracts"
        avatar={titleAvatar}
      />
      <CardContent>
        {table}
      </CardContent>
    </Card>
  );
}

export default ContractList;