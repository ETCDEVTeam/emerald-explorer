import * as React from 'react';
import { BlockWithoutTxData } from 'emerald-js';
import { Node } from '../store/nodes/model';
import BlockList from '../components/BlockList';

interface Props {
  node: Node;
  from: number;
  to: number;
}

interface State {
  blocks: Array<BlockWithoutTxData>;
}

class BlockListContainer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      blocks: []
    };
  }

  async componentWillReceiveProps(nextProps: Props) {
    if (nextProps.from !== this.props.from || nextProps.to !== this.props.to) {
      const blocks = await this.props.node.rpc!.ext.getBlocks(nextProps.from, nextProps.to);
      this.setState({
        blocks: blocks
      });
    }
  }

  async componentWillMount() {
    const { node, from, to } = this.props;
    const blocks = await  node.rpc!.ext.getBlocks(from, to);
    this.setState({
      blocks: blocks
    });
  }

  render() {
    const { blocks } = this.state;
    const { node, from, to } = this.props;
    return (
      <div>
        Blocks from {from} to {to}
        <BlockList blocks={blocks} nodeId={node.id!}/>
      </div>); 
  }
}

export default BlockListContainer;
