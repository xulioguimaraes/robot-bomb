export const positionFruitMapsRandom = (fruitRandomPosition: string, positionPlayer: string) => {
  let maximo = 75;

  let i,
    arr = [];
  for (i = 0; i < maximo; i++) {
    arr[i] = i + 1;
  }
  let p, n, tmp;
  for (p = arr.length; p; ) {
    n = (Math.random() * p--) | 0;
    tmp = arr[n];
    arr[n] = arr[p];
    arr[p] = tmp;
  }
  const positFruit = JSON.parse(fruitRandomPosition);
  const newPostionFruitValid = arr
    .slice(0, 9)
    .map((item) => {
      if (positFruit[item] !== positionPlayer) {
        return positFruit[item];
      }
    })
    .filter((ev) => ev);

    return newPostionFruitValid
};
