import { Map } from 'immutable';

const BASE_URL = 'http://localhost:3000/';

function changeSignInForm(state, formValues) {
  return state.set(formValues.name, formValues.value);
}

function submitSignInForm(state) {
  const email = state.get('email');
  const password = state.get('password');
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': BASE_URL,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': BASE_URL,
      'Host': BASE_URL
    },
    body: JSON.stringify({"email":"foobar@foobar.com","password":"1234"})
  });

  return state.set('waitingForResponse', true);
}

const initialState = Map({
  name: '',
  value: '',
  waitingForResponse: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN_FORM_CHANGE':
      return changeSignInForm(state, action.payload);
    case 'SIGN_IN_FORM_SUBMIT':
      return submitSignInForm(state);
    default:
      return state;
  }
};
