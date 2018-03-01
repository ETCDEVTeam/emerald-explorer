import * as React from 'react';
import { Link } from 'react-router-dom';
import { Node } from '../../store/nodes/model';

import { Block as BlockIcon } from 'emerald-js-ui/lib/icons2';
import { Card } from 'emerald-js-ui';

interface Props {
  nodes: Node[];
}

function NodeList(props: Props) {

  const pendingTxs = (n: Node) => {
    if (n.pendingBlock) {
      return <span>{n.pendingBlock.transactions.length}</span>;
    }
    return null;
  };

  return (
    <div>
      {props.nodes.map(n => (
        <Card key={n.id}>
              <div>
                {n.url} : <BlockIcon />{n.blockNumber}, pending Txs: {pendingTxs(n)}
              </div>
              <div>{n.clientVersion}</div>
              <div>{n.error}</div>
            <div>
              <Link to={'/node/' + n.id} >View</Link>
            </div>
        </Card>

      ))}
    </div>
  );
}

export default NodeList;