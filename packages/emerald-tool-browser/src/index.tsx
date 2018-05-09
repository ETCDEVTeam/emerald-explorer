import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import { run as runServices } from './store/services';

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

runServices(store);