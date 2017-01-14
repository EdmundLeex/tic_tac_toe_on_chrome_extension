import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';

import App from './components/app';

const store = new Store({
  state: {}
});

render(
  <Provider store={store}>
    <App/>
  </Provider>
  , docuemnt.getElementById('app')
);