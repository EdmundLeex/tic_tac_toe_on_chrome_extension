import { createStore } from 'redux';
import reducer from './reducers/index';
import { wrapStore } from 'react-chrome-redux';

const store = createStore(reducer, {});

wrapStore(store, {
  portName: 'SUPER_TTT'
});
