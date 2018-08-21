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

import { AppBar, NetworkSelector, EmeraldProvider } from 'emerald-js-ui';

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
                <Route exact={true} path="/" component={Dashboard} />
                <Route path="/contracts/deploy" component={DeployContract} />
                <Route path="/contracts/:address" component={Contract} />
                <Route path="/contracts" component={ContractList} />
                <Route path="/block/:hash" component={Block} />
                <Route path="/blocks" component={NodeView} />
                <Route path="/tx/:hash" component={Transaction} />
                <Route path="/address/:address" component={Address} />
              </Switch>
            </ConnectedRouter>
          </div>
        </div>
      </EmeraldProvider>
    );
  }
}

export default App;
