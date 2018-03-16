import * as React from 'react';
import { Link } from 'react-router-dom';
import { Transaction } from 'emerald-js';

interface TxViewProps {
  tx: Transaction;
  baseUrl: string;
}

function TxView(props: TxViewProps) {
  const { tx, baseUrl } = props;
  if (!tx) {
    return null;
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>Hash</td><td>{tx.hash}</td>
        </tr>
        <tr>
          <td>Block</td>
          <td><Link to={`${baseUrl}/block/${tx.blockHash}`}>{tx.blockHash}</Link></td>
        </tr>
        <tr>
          <td>Value</td><td>{tx.value.toString()}</td>
        </tr>
        <tr>
          <td>From</td>
          <td><Link to={`${baseUrl}/address/${tx.from}`}>{tx.from}</Link></td>
        </tr>
        <tr>
          <td>To</td>
          <td><Link to={`${baseUrl}/address/${tx.to}`}>{tx.to}</Link></td>
        </tr>
        <tr>
          <td>Input</td><td>{tx.input}</td>
        </tr>
      </tbody>
    </table>
  );

}

export default TxView;