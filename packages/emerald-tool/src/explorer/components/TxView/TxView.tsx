import * as React from 'react';
import { Link } from 'react-router-dom';
import { Transaction, TransactionReceipt } from 'emerald-js';

export interface TxViewProps {
  tx: Transaction;
  receipt: TransactionReceipt | null;
  baseUrl: string;
}

function renderTxTable(tx: Transaction, receipt: TransactionReceipt | null, baseUrl: string) {
  return (
    <div>
      <div>General</div>
      <div>
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

      </div>
      <div>Receipt</div>
      <div>
        {receipt &&
          <table>
            <tbody>
              <tr>
                <td>Hash</td><td>{receipt.transactionHash}</td>
              </tr>
              <tr>
                <td>Block</td>
                <td><Link to={`${baseUrl}/block/${receipt.blockHash}`}>{receipt.blockHash}</Link></td>
              </tr>
              <tr>
                <td>Block number</td>
                <td>{receipt.blockNumber}</td>
              </tr>
              <tr>
                <td>Gas Used</td><td>{receipt.gasUsed}</td>
              </tr>
              <tr>
                <td>Cumulative Gas Used</td><td>{receipt.cumulativeGasUsed}</td>
              </tr>
              <tr>
                <td>Value</td><td>{tx.value.toString()}</td>
              </tr>
              <tr>
                <td>From</td>
                <td><Link to={`${baseUrl}/address/${receipt.from}`}>{receipt.from}</Link></td>
              </tr>
              <tr>
                <td>To</td>
                <td><Link to={`${baseUrl}/address/${receipt.to}`}>{receipt.to}</Link></td>
              </tr>
              <tr>
                <td>Contract Address</td>
                <td>{receipt.contractAddress}</td>
              </tr>
              <tr>
                <td>TransactionIndex</td>
                <td>{receipt.transactionIndex}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{receipt.status}</td>
              </tr>
              <tr>
                <td>Logs</td>
                <td><textarea>{receipt.logs}</textarea></td>
              </tr>
            </tbody>
          </table>
        }
      </div>
    </div>
  );
}

function TxView(props: TxViewProps) {
  const { tx, receipt, baseUrl } = props;
  if (!tx) {
    return null;
  }

  return (
    <div>
        <div>
          {renderTxTable(tx, receipt, baseUrl)}
        </div>
        <div>
          <div>
            <textarea>
              {JSON.stringify(tx)}
            </textarea>
          </div>
          <div>
            <textarea>
              {JSON.stringify(receipt)}
            </textarea>
          </div>
        </div>
        </div>
  );
}

export default TxView;