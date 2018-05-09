import * as React from 'react';
import { Link } from 'react-router-dom';

import './Breadcrumbs.css';

interface Props {
  nodeId?: string;
}

function Breadcrumbs(props: Props) {
  const { nodeId } = props;
  return (
      <div className="container">
        <div><Link to="/">Dashboard</Link></div>
        {nodeId && <div> / <Link to={`/node/${nodeId}`}>Node</Link></div>}
      </div>
  );
}

export default Breadcrumbs;