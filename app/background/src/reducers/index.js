import {combineReducers} from 'redux';
import game from './game';
import signInForm from './sign_in_form';
import notification from './notification';

export default combineReducers({
  game,
  signInForm,
  notification
});