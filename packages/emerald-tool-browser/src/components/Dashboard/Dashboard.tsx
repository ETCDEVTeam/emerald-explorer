import * as React from 'react';

import NodeList from '../../containers/NodeList';
import { Page } from 'emerald-js-ui';

export interface Props {

}

function Dashboard(props: Props) {
  return (
    <Page title="Dashboard">
      <NodeList />
    </Page>
  );
}

export default Dashboard;
