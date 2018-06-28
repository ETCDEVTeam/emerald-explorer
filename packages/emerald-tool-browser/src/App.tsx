import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router';

import './App.css';
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

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {}
});

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Header />
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
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
