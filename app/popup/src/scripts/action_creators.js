export const MAKE_MOVE = 'MAKE_MOVE';
export function makeMove(pos) {
  return {
    type: MAKE_MOVE,
    payload: pos
  }
}
