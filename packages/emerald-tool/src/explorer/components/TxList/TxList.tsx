import * as React from 'react';
import { Link } from 'react-router-dom';
import { Transaction } from 'emerald-js';

export interface TxListProps {
  transactions: Transaction[];
  baseUrl: string;
}

function TxListItem({tx, baseUrl}: { tx: Transaction, baseUrl: string }) {
  return (
    <tr>
      <td><Link to={`${baseUrl}/tx/${tx.hash}`}>{tx.hash}</Link></td>
      <td><Link to={`${baseUrl}/address/${tx.from}`}>{tx.from}</Link></td>
      <td><Link to={`${baseUrl}/address/${tx.to}`}>{tx.to}</Link></td>
      <td>{tx.transactionIndex}</td>
    </tr>
  );
}

function TxList(props: TxListProps) {

  return (
    <table>
      <thead>
        <tr>
        <td>Hash</td>
        <td>From</td>
        <td>To</td>
        <td>Index</td>
        </tr>
      </thead>
      <tbody>
        {props.transactions.map(tx => <TxListItem key={tx.hash} tx={tx} baseUrl={props.baseUrl}/>)}
      </tbody>
    </table>
  );
}

export default TxList;