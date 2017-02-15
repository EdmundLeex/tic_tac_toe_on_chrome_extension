import React from 'react';
import { render } from 'react-dom';

import App from './components/app';

import { Store } from 'react-chrome-redux';
import { Provider } from 'react-redux';

const proxyStore = new Store({
  portName: 'SUPER_TTT'
});

render(
  <Provider store={ proxyStore }>
    <App />
  </Provider>
  , document.getElementById('app')
);