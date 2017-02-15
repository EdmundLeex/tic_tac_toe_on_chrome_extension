import reducer from './reducers/index';
import { applyMiddleware, createStore } from 'redux';
import { alias, wrapStore } from 'react-chrome-redux';

import aliases from './aliases/index';

const store = createStore(reducer,
  applyMiddleware(
    alias(aliases)
  )
);

wrapStore(store, {
  portName: 'SUPER_TTT'
});
