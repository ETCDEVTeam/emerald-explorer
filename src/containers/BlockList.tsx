import * as React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { Back as BackIcon } from 'emerald-js-ui/lib/icons2';
// import { AppState } from '../store/types';
import { BlockWithoutTxData } from 'emerald-js';
import { Node } from '../store/nodes/model';

interface Props {
  node: Node;
  from: number;
  to: number;
}

interface State {
  blocks: Array<BlockWithoutTxData>;
}

class BlockList extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      blocks: []
    };
  }

  async componentWillMount() {
    const { node, from, to } = this.props;
    const blocks = await  node.rpc!.ext.getBlocks(from, to);
    console.log(blocks);
    this.setState({
      blocks: blocks
    });
  }

  renderBlock(b: BlockWithoutTxData) {
    return (
      <div>
        <div>{b.number}</div>
        <div>{b.hash}</div>
      </div>);
  }

  render() {
    const { blocks } = this.state;
    return (
      <div>
        Blocks from {this.props.from} to {this.props.to}
        {
          blocks.map(b => (<div key={b.number!}>{this.renderBlock(b)}</div>))}
      </div>);
  }
}

export default BlockList;
