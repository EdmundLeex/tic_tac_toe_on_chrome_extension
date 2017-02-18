import {combineReducers} from 'redux';
import game from './game';
import signInForm from './sign_in_form';
import ui from './ui';

export default combineReducers({
  game,
  signInForm,
  ui
});