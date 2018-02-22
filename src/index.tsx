import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from 'emerald-js-ui/src/theme.json';
import { Provider } from 'react-redux';
import store from './store';

const muiTheme = getMuiTheme(theme);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
