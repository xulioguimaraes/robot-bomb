
export const movementPlayer = (
  eventCode: string,
  setPositionPlayer: (arg0: string) => void,
  positionPlayer: string,
  positionsWall: Array<any[]>
) => {
  const arrayPlayer = positionPlayer.split(",");
  if (
    eventCode === "ArrowDown" ||
    eventCode === "ArrowUp" ||
    eventCode === "ArrowLeft" ||
    eventCode === "ArrowRight"
  ) {
    switch (eventCode) {
      case "ArrowDown":
        const newPositionPlayerDown = `${parseInt(arrayPlayer[0]) + 1},${
          arrayPlayer[1]
        }`;
        const playerInWallDown = positionsWall.some((item) => {
          return item.find((ev: string) => ev === newPositionPlayerDown);
        });
        if (playerInWallDown) {
          return;
        }
        setPositionPlayer(newPositionPlayerDown);
        break;
      case "ArrowUp":
        const newPositionPlayerUp = `${parseInt(arrayPlayer[0]) - 1},${
          arrayPlayer[1]
        }`;
        const playerInWallUp = positionsWall.some((item) => {
          return item.find((ev: string) => ev === newPositionPlayerUp);
        });
        if (playerInWallUp) {
          return;
        }
        setPositionPlayer(newPositionPlayerUp);
        break;
      case "ArrowLeft":
        const newPositionPlayerLeft = `${arrayPlayer[0]},${
          parseInt(arrayPlayer[1]) - 1
        }`;
        const playerInWallLeft = positionsWall.some((item) => {
          return item.find((ev: string) => ev === newPositionPlayerLeft);
        });
        if (playerInWallLeft) {
          return;
        }
        setPositionPlayer(newPositionPlayerLeft);
        break;
      case "ArrowRight":
        const newPositionPlayerRight = `${arrayPlayer[0]},${
          parseInt(arrayPlayer[1]) + 1
        }`;
        const playerInWallRight = positionsWall.some((item) => {
          return item.find((ev: string) => ev === newPositionPlayerRight);
        });
        if (playerInWallRight) {
          return;
        }
        setPositionPlayer(newPositionPlayerRight);
        break;

      default:
        break;
    }
  }
  return;
};
