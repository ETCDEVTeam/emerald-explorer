import * as React from 'react';
import { match /*, RouteComponentProps*/} from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../store/types';
import { Node } from '../store/nodes/model';
import { BlockWithTxData } from 'emerald-js';
import { BlockView } from 'emerald-tool';
import { Page, EthRpc } from 'emerald-js-ui';
import Back from 'emerald-js-ui/lib/icons3/Back';

export default function Block(props: any) {
  const { history: { goBack }, match: { params: { hash } } } = props;
  return (
    <EthRpc method="eth.getBlock" params={[hash, true]}>
      {block => (<BlockView block={block} />)}
    </EthRpc>
  );
}
