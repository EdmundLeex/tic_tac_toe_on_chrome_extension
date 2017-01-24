export const MAKE_MOVE = 'MAKE_MOVE';
export function makeMove(pos) {
  return {
    type: MAKE_MOVE,
    payload: pos
  }
}

export const POST_MOVE = 'POST_MOVE';
export function postMove(pos) {
  fetch('', {
    method: 'POST',
    body: data
  }).then;
}