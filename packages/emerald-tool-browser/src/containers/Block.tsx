import * as React from 'react';
import { match /*, RouteComponentProps*/} from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../store/types';
import { Node } from '../store/nodes/model';
import { BlockWithTxData } from 'emerald-js';
import { BlockView } from 'emerald-tool';
import { Page, EthRpc } from 'emerald-js-ui';

interface Props {
  match: { params: { hash: string } };
}

class Block extends React.Component<Props> {
  render() {
    const { hash } = this.props.match.params;
    return (
      <Page title="Block View">
        <EthRpc method="eth.getBlock" params={[hash, true]}>
          {block => (<BlockView block={block} />)}
        </EthRpc>
      </Page>
    );
  }
}

export default Block;
