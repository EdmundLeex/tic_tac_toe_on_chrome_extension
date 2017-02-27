export * from './notification';
export * from './game';
export * from './user';

export const WAITING_FOR_RESPONSE = 'WAITING_FOR_RESPONSE';
export function waitForResponse() {
  return {
    type: WAITING_FOR_RESPONSE
  };
}

export const CLEAR_PASSWORD = 'CLEAR_PASSWORD';
export function clearPassword() {
  return {
    type: CLEAR_PASSWORD
  };
}

export const CHANGE_VIEW = 'CHANGE_VIEW';
export function changeViewTo(view) {
  return {
    type: CHANGE_VIEW,
    payload: view
  }
}
