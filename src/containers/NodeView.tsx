import * as React from 'react';
import { match } from 'react-router';
import { Link } from 'react-router-dom';
import { Back as BackIcon } from 'emerald-js-ui/lib/icons2';

interface Props {
  match: match<{ [key: string]: string }>;
}

function NodeView(props: Props) {
  return (
  <div>
    <div><Link to="/"><BackIcon />Dashboard</Link></div>
    <div>Node ID: {props.match.params.id}</div>
  </div>);
}

export default NodeView;