import * as React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Link } from 'react-router-dom';
import { Transaction } from 'emerald-js';

interface TxViewProps {
  tx: Transaction;
  baseUrl: string;
}

function renderTxTable(tx: Transaction, baseUrl: string) {
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
          <td>Block number</td>
          <td>{tx.blockNumber}</td>
        </tr>
        <tr>
          <td>Gas</td><td>{tx.gas}</td>
        </tr>
        <tr>
          <td>Gas Price</td><td>{tx.gasPrice.toString()}</td>
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
          <td>Nonce</td>
          <td>{tx.nonce}</td>
        </tr>
        <tr>
          <td>TransactionIndex</td>
          <td>{tx.transactionIndex}</td>
        </tr>
        <tr>
          <td>Input</td>
          <td>{tx.input}</td>
        </tr>
        <tr>
          <td>ReplayProtected</td>
          <td>{tx.replayProtected && tx.replayProtected.toString()}</td>
        </tr>
        <tr>
          <td>v</td>
          <td>{tx.v}</td>
        </tr>
        <tr>
          <td>r</td>
          <td>{tx.r}</td>
        </tr>
        <tr>
          <td>s</td>
          <td>{tx.s}</td>
        </tr>
      </tbody>
    </table>
  );
}

function TxView(props: TxViewProps) {
  const { tx, baseUrl } = props;
  if (!tx) {
    return null;
  }

  return (
    <Tabs>
      <Tab label="Tx data" >
        <div>
          {renderTxTable(tx, baseUrl)}
        </div>
      </Tab>
      <Tab label="JSON" >
        <div>
          <textarea>
          {JSON.stringify(tx)}
          </textarea>
        </div>
      </Tab>
    </Tabs>
  );
}

export default TxView;