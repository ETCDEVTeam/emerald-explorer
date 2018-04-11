import * as React from 'react';
import { BigNumber } from 'bignumber.js';

interface AddressViewProps {
  address: string;
  balance: BigNumber;
  txCount: number;
  code: string;
  baseUrl: string;
}

function renderGeneral(props: AddressViewProps) {
  const { address, balance, txCount, code } = props;
  return (
    <div>
    <div>Balance: {balance && balance.toString()}</div>
    <div>Tx count: {txCount}</div>
    <div>{address}</div>
    <div>Code</div>
    <div>
        <textarea value={code} />
    </div>
  </div>
  );
}

function AddressView(props: AddressViewProps) {
  return (
    <React.Fragment>
        {renderGeneral(props)}
    </React.Fragment>
  );
}

export default AddressView;