import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router';

import './App.css';
import Dashboard from './containers/Dashboard';
import NodeView from './containers/NodeView';
import BlockView from './containers/BlockView';
import Header from './components/Header';

import { history } from './store';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Header />
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact={true} path="/" component={Dashboard} />
            <Route path="/node/:id/block/:hash" component={BlockView} />
            <Route path="/node/:id" component={NodeView} />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
