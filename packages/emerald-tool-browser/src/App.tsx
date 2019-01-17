import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';

import Dashboard from './containers/Dashboard';
import NodeView from './containers/NodeView';
import Header from './components/Header';
import Block from './containers/Block';
import Address from './containers/Address';
import Transaction from './containers/Transaction';

import { history } from './store';
import { Page, icons } from '@emeraldplatform/ui';
import { AppBar, NetworkSelector, EmeraldProvider } from '@emeraldplatform/ui';

const routes = [
  { path: '/', component: NodeView, title: 'Latest Blocks', exact: true },
  // { path: '/contracts/deploy', component: DeployContract, title: 'Deploy Contract' },
  // { path: '/contracts/:address', component: Contract, title: 'Contract' },
  // { path: '/contracts', component: ContractList, title: 'Display Contract' },
  { path: '/block/:hash', component: Block, title: 'Block' },
  { path: '/blocks', component: NodeView, title: 'Latest Blocks' },
  { path: '/tx/:hash', component: Transaction, title: 'Transaction Details' },
  { path: '/address/:address', component: Address, title: 'Address Details' },
];

class App extends React.Component {
  render() {
    return (
      <EmeraldProvider ethUrl="http://localhost:8545">
        <div>
          <div>
            <AppBar title="Emerald" subtitle="Explorer">
              <NetworkSelector />
            </AppBar>
          </div>
          <div style={{ margin: '20px' }}>
            <ConnectedRouter history={history}>
              <Switch>
                {
                  routes.map((routeProps, i) => {
                    var wrapped = (props) => (
                      <Page title={routeProps.title} leftIcon={<icons.Back onClick={history.goBack} />}>
                        {routeProps.component({ ...props, history })}
                      </Page>
                    );

                    return (<Route key={i} path={routeProps.path} component={wrapped} exact={routeProps.exact} />);
                  })
                }
              </Switch>
            </ConnectedRouter>
          </div>
        </div>
      </EmeraldProvider>
    );
  }
}

export default App;
