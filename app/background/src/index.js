import reducer from './reducers/index';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { alias, wrapStore } from 'react-chrome-redux';
import { fetchGames } from './actions/index';

import aliases from './aliases/index';

const enhancer = applyMiddleware(
  alias(aliases),
  thunk,
  logger
);

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
