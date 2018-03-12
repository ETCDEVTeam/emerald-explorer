import * as React from 'react';
import { BlockWithTxData } from 'emerald-js';

interface Props {
  block: BlockWithTxData;
}

function BlockView(props: Props) {
    const { block } = props;
    if (!block) {
      return (<div>Loading...</div>);
    }

    return (
      <div>
        <div>
          <div>hash</div><div>{block.hash}</div>
          <div>parentHash</div><div>{block.parentHash}</div>
        </div>
      </div>
    );
}

export default BlockView;