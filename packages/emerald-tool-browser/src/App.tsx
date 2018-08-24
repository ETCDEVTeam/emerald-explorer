import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router';

import Dashboard from './containers/Dashboard';
import NodeView from './containers/NodeView';
import Header from './components/Header';
import Block from './containers/Block';
import Address from './containers/Address';
import Transaction from './containers/Transaction';
import ContractList from './containers/ContractList';
import Contract from './containers/Contract';
import DeployContract from './containers/DeployContract';
import { history } from './store';
import Page from 'emerald-js-ui/lib/components/Page';
import Back from 'emerald-js-ui/lib/icons3/Back';

import { AppBar, NetworkSelector, EmeraldProvider } from 'emerald-js-ui';

const routes = [
  { path: '/', component: Dashboard, title: 'Dashboard', exact: true },
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
      <EmeraldProvider>
        <div>
          <div>
            <AppBar title="Emerald" subtitle="Tool">
              <NetworkSelector />
            </AppBar>
          </div>
          <div style={{ margin: '20px' }}>
            <ConnectedRouter history={history}>
              <Switch>
                {
                  routes.map((routeProps, i) => {
                    var wrapped = (props) => (
                      <Page title={routeProps.title} leftIcon={<Back onClick={history.goBack} />}>
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
