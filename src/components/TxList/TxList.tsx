import * as React from 'react';
import { Link } from 'react-router-dom';
import { Transaction } from 'emerald-js';

import './TxList.css';

interface TxListProps {
  transactions: Transaction[];
  baseUrl: string;
}

function TxListItem({tx, baseUrl}: { tx: Transaction, baseUrl: string }) {
  return (
    <tr>
      <td><Link to={`${baseUrl}/tx/${tx.hash}`}>{tx.hash}</Link></td>
      <td><Link to={`${baseUrl}/address/${tx.from}`}>{tx.from}</Link></td>
      <td><Link to={`${baseUrl}/address/${tx.to}`}>{tx.to}</Link></td>
    </tr>
  );
}

function TxList(props: TxListProps) {

  return (
    <table>
      <thead>
        <td>Hash</td>
        <td>From</td>
        <td>To</td>
      </thead>
      <tbody>
        {props.transactions.map(tx => <TxListItem key={tx.hash} tx={tx} baseUrl={props.baseUrl}/>)}
      </tbody>
    </table>
  );
}

export default TxList;