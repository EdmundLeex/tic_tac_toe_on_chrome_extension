import React from 'react';
import { render } from 'react-dom';

import App from './components/app';

import { Store } from 'react-chrome-redux';
import { Provider } from 'react-redux';

import { applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

const proxyStore = new Store({
  portName: 'SUPER_TTT'
});

const _dispatch = proxyStore.dispatch;

proxyStore.dispatch = function(action) {
  if (typeof action === 'function') {
    return action(_dispatch);
  }

  return _dispatch(action);
}

render(
  <Provider store={ proxyStore }>
    <App />
  </Provider>
  , document.getElementById('app')
);