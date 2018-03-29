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

import { history } from './store';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Header />
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact={true} path="/" component={Dashboard} />
            <Route path="/node/:id/contracts" component={ContractList} />
            <Route path="/node/:id/block/:hash" component={Block} />
            <Route path="/node/:id/tx/:hash" component={Transaction} />
            <Route path="/node/:id/address/:hex" component={Address} />
            <Route path="/node/:id" component={NodeView} />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
