import * as React from 'react';
import { BlockWithoutTxData } from 'emerald-js';
import { Node } from '../store/nodes/model';
import { BlockList } from 'emerald-tool';
import { EthRpc } from 'emerald-js-ui';

interface Props {
  from: number;
  to: number;
}

interface State {}

class BlockListContainer extends React.Component<Props, State> {
  render() {
    const { from, to } = this.props;
    return (
      <div>
      Blocks from {from} to {to}
      <EthRpc method="ext.getBlocks" params={[this.props.from, this.props.to]}>
        {blocks => (<BlockList blocks={blocks} />)}
      </EthRpc>
      </div>
    );
  }
}

export default BlockListContainer;
