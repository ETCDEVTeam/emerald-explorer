import * as React from 'react';
import Button from '@material-ui/core/Button';

export interface Props {
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
        <Button onClick={props.onSendTx}>Broadcast</Button>
      </div>
    </div>
  );
}

export default SignedDeployTx;