export function getRandomPos(min = 0, max = 9) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getAnotherRandomPos(pos) {
  let randPos = getRandomPos();
  if (randPos === pos) {
    return getAnotherRandomPos(pos);
  } else {
    return randPos;
  }
}

