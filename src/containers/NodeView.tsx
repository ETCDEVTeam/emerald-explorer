import * as React from 'react';
import { match } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../store/types';
import { Node } from '../store/nodes/model';
import BlockList from './BlockList';
import Breadcrumbs from '../components/Breadcrumbs';

interface Props {
  node: Node;
}

function NodeView(props: Props) {
  const to = props.node.blockNumber!;
  const from = to - 15;
  return (
    <div>
      <Breadcrumbs />
      <div><Link to={`/node/${props.node.id}/contracts`}>Contracts</Link></div>
      <div>Node ID: {props.node.id}</div>
      <div>
        <BlockList node={props.node} from={from} to={to} />
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
