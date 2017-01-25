export const PLACE_MARK = 'PLACE_MARK';
export function placeMark(pos) {
  return {
    type: PLACE_MARK,
    payload: pos
  }
}

export function makeMove(pos) {
  return function(dispatch) {
    dispatch(placeMark(pos));
  }
}