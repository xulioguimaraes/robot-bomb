import { maps } from "../world/maps";

export const positionPlayerRandom =() => {
  let positionX = 0;
  let positionY = 0;
  let condition = false;
  // let arrayPositionFruit = [];
  do {
    positionX = Math.floor(Math.random() * 10 + 1);
    positionY = Math.floor(Math.random() * 10 + 1);
    maps.forEach((_, _X) => {
      _.forEach((matrix, _Y) => {
        if (
          `${_X},${_Y}` === `${positionX},${positionY}` &&
          matrix.type === "wall"
        ) {
          condition = true;
        }
      });
    });
    // if (!condition) {
    //   arrayPositionFruit.push(
    //     `${(positionX)},${(positionY)}`
    //   );
    // }
  } while (condition);
 
    // const obj ={positionInitialPlayer:arrayPositionFruit[0],  arrayPositionFruit: arrayPositionFruit.shift()}
  return `${(positionX)},${(positionY)}`;
};
