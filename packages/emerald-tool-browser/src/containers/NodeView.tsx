import * as React from 'react';
import { match } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../store/types';
import { Node } from '../store/nodes/model';
import BlockList from './BlockList';
import Breadcrumbs from '../components/Breadcrumbs';
import Page from 'emerald-js-ui/lib/components/Page';
import Back from 'emerald-js-ui/lib/icons3/Back';
import { EthRpc } from 'emerald-js-ui';

interface Props {
  history: { goBack: () => any };
}

export default withRouter(function NodeView(props: Props) {
  const { history } = props;
  return (
    <div>
      <Page title="fooBar" leftIcon={<Back onClick={history.goBack} />}>
        <EthRpc method="eth.getBlockNumber">
          {blockNumber => (<BlockList from={Math.max(blockNumber - 15, 0)} to={blockNumber} />)}
        </EthRpc>
      </Page>
    </div>
  );
});
