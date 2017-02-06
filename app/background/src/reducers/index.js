import {combineReducers} from 'redux';
import game from './game';
import signInForm from './sign_in_form';

export default combineReducers({
  game,
  signInForm
});