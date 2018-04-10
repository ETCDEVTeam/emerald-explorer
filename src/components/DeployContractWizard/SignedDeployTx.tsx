import * as React from 'react';
import { RaisedButton } from 'material-ui';

interface Props {
  signedTx: string;
  tx: {};
  onSendTx: () => void;
}

function SignedDeployTx(props: Props) {
  const { signedTx, tx } = props;
  return (
    <div>
      <div><pre>{JSON.stringify(tx)}</pre></div>
      <div><pre>{signedTx}</pre></div>
      <div>
        <RaisedButton onClick={props.onSendTx}>Broadcast</RaisedButton>
      </div>
    </div>
  );
}

export default SignedDeployTx;