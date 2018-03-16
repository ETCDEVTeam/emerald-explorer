import * as React from 'react';
import { BigNumber } from 'bignumber.js';

interface AddressViewProps {
  address: string;
  balance: BigNumber;
  txCount: number;
  code?: string;
  baseUrl: string;
}

function AddressView(props: AddressViewProps) {
  const { address, balance, txCount } = props;
  return (
    <div>
      <div>Balance: {balance && balance.toString()}</div>
      <div>Tx count: {txCount}</div>
      <div>{address}</div>
    </div>
  );
}

export default AddressView;