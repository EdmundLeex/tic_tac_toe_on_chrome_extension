import {combineReducers} from 'redux';
import game from './game';
import loginForm from './login_form';
import signUpForm from './sign_up_form';
import notification from './notification';
import appState from './app_state';
import user from './user';

export default combineReducers({
  game,
  loginForm,
  signUpForm,
  notification,
  appState,
  user
});