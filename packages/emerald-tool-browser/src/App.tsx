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

import { MuiThemeProvider, withTheme } from '@material-ui/core/styles';
import { AppBar } from 'emerald-js-ui';
import theme from 'emerald-js-ui/lib/theme';

class App extends React.Component<theme> {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <div>
            <AppBar
              title="Emerald Tool"
              subtitle="wut"
              blockNumber="7331"
              fiatBalance="200"
              fiatSymbol="USD"
              balance="20"
              symbol="ETC"
            />
          </div>
          <div style={{ margin: '20px' }}>
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact={true} path="/" component={Dashboard} />
                <Route path="/node/:id/contracts/deploy" component={DeployContract} />
                <Route path="/node/:id/contracts/:address" component={Contract} />
                <Route path="/node/:id/contracts" component={ContractList} />
                <Route path="/node/:id/block/:hash" component={Block} />
                <Route path="/node/:id/tx/:hash" component={Transaction} />
                <Route path="/node/:id/address/:hex" component={Address} />
                <Route path="/node/:id" component={NodeView} />
              </Switch>
            </ConnectedRouter>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
