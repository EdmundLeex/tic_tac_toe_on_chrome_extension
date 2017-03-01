import reducer from './reducers/index';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { alias, wrapStore } from 'react-chrome-redux';
import { fetchGames } from './actions/index';

import aliases from './aliases/index';

const logger = createLogger();

const enhancer = applyMiddleware(
  alias(aliases),
  thunk,
  logger
);

const store = createStore(reducer, enhancer);

window.setInterval(() => {
  store.dispatch(fetchGames());
}, 5000);

wrapStore(store, {
  portName: 'SUPER_TTT'
});
