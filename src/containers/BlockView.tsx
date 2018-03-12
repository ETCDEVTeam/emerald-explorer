import * as React from 'react';
import { match, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../store/types';
import { Node } from '../store/nodes/model';
import { BlockWithTxData } from 'emerald-js';
import BlockView from '../components/BlockView';

interface Props extends RouteComponentProps<void> {
  node: Node;
  hash: string;
}

interface State {
  block: BlockWithTxData | null;
}

class BlockViewContainer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      block: null,
    };
  }

  async componentWillMount() {
    const { node, hash } = this.props;
    const block = await  node.rpc!.eth.getBlock(hash, true);
    this.setState({
      block: block
    });
  }

  render() {
    const { block } = this.state;
    return (
      <div>
        <BlockView block={block!} />
      </div>); 
  }
}

interface OwnProps {
  match: match<{ [key: string]: string }>;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  node: state.nodes.nodes.find(n => n.id === ownProps.match.params.id),
  hash: ownProps.match.params.hash,
});

export default (connect(mapStateToProps)(BlockViewContainer));
