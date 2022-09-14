import { maps } from "../world/maps";

export const positionPlayerInitialRandom = () => {
  let positionX = 0;
  let positionY = 0;
  let finalLoop = 10;
  for (let index = 0; index < finalLoop; index++) {
    positionX = Math.floor(Math.random() * 10 + 1);
    positionY = Math.floor(Math.random() * 10 + 1);
    const validationPosition = maps.some((_, _X) =>
      _.some(
        (matrix, _Y) =>
          `${_X},${_Y}` === `${positionX},${positionY}` &&
          matrix.type === "wall"
      )
    );
    if (!validationPosition) {
      finalLoop = index;
    }
  }
  return `${positionX},${positionY}`;
};
