import reducer from './reducers/index';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { alias, wrapStore } from 'react-chrome-redux';
import { fetchGames } from './actions/index';

import aliases from './aliases/index';

chrome.management.getSelf(app => {
  let middlewares = [alias(aliases), thunk];

  if (app.installType === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }

  const enhancer = applyMiddleware(...middlewares);
  const store = createStore(reducer, enhancer);

  window.setInterval(() => {
    if (store.getState().appState.get('loggedIn') === true) {
      store.dispatch(fetchGames());
    } else {
      // no op
    }
  }, 5000);

  wrapStore(store, {
    portName: 'SUPER_TTT'
  });
});

