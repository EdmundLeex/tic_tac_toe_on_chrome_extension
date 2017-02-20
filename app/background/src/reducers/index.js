import {combineReducers} from 'redux';
import game from './game';
import loginForm from './login_form';
import notification from './notification';

export default combineReducers({
  game,
  loginForm,
  notification
});