import {combineReducers} from 'redux';
import game from './game';
import loginForm from './login_form';
import notification from './notification';
import appState from './app_state';

export default combineReducers({
  game,
  loginForm,
  notification,
  appState
});