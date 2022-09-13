import { Box, Container, styled } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { createRef, useEffect, useState } from "react";
import Appbar from "../components/Appbar/Appbar";
import { Maps } from "../components/Maps/Maps";
import { movementPlayer } from "../player/movementPlayer";
import { maps } from "../world/maps";
import { positionFruitMapsRandom } from "../world/positionFruitMapsRandom";
interface HomeProps {
  positionWall: string;
  positionPlayerRandom: string;
  fruitRandomPosition: string;
}
const BoxSpace = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));
const InputKeyboard = styled("input")(({ theme }) => ({
  position: "relative",
  top: 0,
  display: "flex",
  border: "none",
  width: ".1px",
  height: ".1px",
}));
export default function Home({
  positionWall,
  positionPlayerRandom,
  fruitRandomPosition,
}: HomeProps) {
  const [positionRandomFruit, setPositionRandomFruit] = useState<
    Array<any[] | undefined>
  >([]);
  const [positionsWall, setPositionsWall] = useState<Array<any[]>>(
    JSON.parse(positionWall)
  );
  const [pump, setPump] = useState({ active: false, positionBomb: "" });
  const [pointsPlayer1, setPointsPlayer2] = useState<string[]>([]);
  const [resetPoints, setResetPoints] = useState(false);
  const [positionPlayer, setPositionPlayer] = useState(positionPlayerRandom);
  const ref = createRef<HTMLInputElement>();

  const handleClick = () => {
    ref.current?.focus();
  };

  useEffect(() => {
    setPositionRandomFruit(
      positionFruitMapsRandom(fruitRandomPosition, positionPlayer)
    );
    setPointsPlayer2([]);
  }, [resetPoints]);
  useEffect(() => {
    if (positionRandomFruit.length > 0) {
      const positionAux = positionRandomFruit.filter((item) => {
        if (String(item) !== positionPlayer) {
          return item;
        }
        setPointsPlayer2((event) => [...event, String(item)]);
      });
      setPositionRandomFruit(positionAux);
    }
  }, [positionPlayer]);

  const handleDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    movementPlayer(
      event.code,
      setPositionPlayer,
      positionPlayer,
      positionsWall
    );
  };
  return (
    <>
      <Appbar />
      <Container component="main">
        <BoxSpace>
          <p>Pontos: {pointsPlayer1.length}</p>{" "}
          <button onClick={() => setResetPoints(!resetPoints)}>Resetar</button>
        </BoxSpace>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div onClick={handleClick}>
            <InputKeyboard ref={ref} type="text" onKeyDown={handleDown} />
            <Maps
              positionPlayer={positionPlayer}
              pump={pump}
              positionRandomFruit={positionRandomFruit}
            />
          </div>
        </div>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const wall = await maps.map((_, _X) => {
    return _.map((item, _Y) => item.type === "wall");
  });

  const positionWall = await wall.map((_, _X) => {
    return _.map((item, _Y) => {
      if (item) {
        return `${_X},${_Y}`;
      }
    });
  });
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

  const positionPossibleFruit: string[] = [];
  maps.forEach((_, _X) => {
    _.forEach((matrix, _Y) => {
      if (matrix.type !== "wall") {
        positionPossibleFruit.push(`${_X},${_Y}`);
      }
    });
  });
  const positionPlayerRandom = `${positionX},${positionY}`;

  return {
    props: {
      positionWall: JSON.stringify(positionWall),
      positionPlayerRandom,
      fruitRandomPosition: JSON.stringify(positionPossibleFruit),
    },
  };
};
