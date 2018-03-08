import * as React from 'react';
import { match } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Back as BackIcon } from 'emerald-js-ui/lib/icons2';
import { AppState } from '../store/types';
import { Node } from '../store/nodes/model';
import BlockList from './BlockList';

interface Props {
  node: Node;
}

function NodeView(props: Props) {
  return (
  <div>
    <div><Link to="/"><BackIcon />Dashboard</Link></div>
    <div>Node ID: {props.node.id}</div>
    <div>
      <BlockList node={props.node} from={10} to={20} />
    </div>
  </div>);
}

interface OwnProps {
  match: match<{ [key: string]: string }>;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
    node: state.nodes.nodes.find(n => n.id === ownProps.match.params.id)
});

export default connect(mapStateToProps)(NodeView);
