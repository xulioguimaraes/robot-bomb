import { Box, Button, Container, styled } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import { createRef, useEffect, useState } from "react";
import Appbar from "../components/Appbar/Appbar";
import { ModalWinner } from "../components/MadalWinner/MadalWinner";
import { Maps } from "../components/Maps/Maps";
import { movementPlayer } from "../player/movementPlayer";
import { positionPlayerInitialRandom } from "../player/positionPlayerInitialRandom";
import { maps } from "../world/maps";
import { positionFruitMapsRandom } from "../world/positionFruitMapsRandom";
interface HomeProps {
  positionWall: string;
  positionPlayerRandom: string;
  fruitRandomPosition: string;
  positionIaRandom: string;
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
  positionIaRandom,
}: HomeProps) {
  const [positionRandomFruit, setPositionRandomFruit] = useState<
    Array<any[] | undefined>
  >([]);
  const [positionsWall, setPositionsWall] = useState<Array<any[]>>(
    JSON.parse(positionWall)
  );
  const [pump, setPump] = useState({ active: false, positionBomb: "" });
  const [pointsPlayer1, setPointsPlayer1] = useState<string[]>([]);
  const [resetPoints, setResetPoints] = useState(false);
  const [isModalWinnerOpen, setIsModalWinnerOpen] = useState(false);
  const [positionPlayer, setPositionPlayer] = useState(positionPlayerRandom);
  const [positionPlayerIa, setPositionPlayerIa] = useState(positionIaRandom);
  const ref = createRef<HTMLInputElement>();

  const handleClick = () => {
    ref.current?.focus();
  };

  useEffect(() => {
    setPositionRandomFruit(
      positionFruitMapsRandom(fruitRandomPosition, positionPlayer)
    );
    setPointsPlayer1([]);
  }, [resetPoints]);
  useEffect(() => {
    if (positionRandomFruit.length === 0) {
      setIsModalWinnerOpen(true);
      console.log(isModalWinnerOpen);
    }
  }, [positionRandomFruit]);
  useEffect(() => {
    if (positionRandomFruit.length > 0) {
      const positionAux = positionRandomFruit.filter((item) => {
        if (String(item) !== positionPlayer) {
          return item;
        }
        setPointsPlayer1((event) => [...event, String(item)]);
      });
      setPositionRandomFruit(positionAux);
      setIsModalWinnerOpen(false);
    }
  }, [positionPlayer]);
  useEffect(() => {
    setTimeout(() => {
      console.log(positionPlayerIa);
      const auxPosition = positionPlayerIa.split(",");
      const newPosibility = [
        `${parseInt(auxPosition[0]) - 1},${parseInt(auxPosition[1])}`,
        `${parseInt(auxPosition[0])},${parseInt(auxPosition[1]) + 1}`,
        `${parseInt(auxPosition[0]) + 1},${parseInt(auxPosition[1])}`,
        `${parseInt(auxPosition[0])},${parseInt(auxPosition[1]) - 1}`,
      ];
      const posibiltyNewPath = newPosibility.map((position) => {
        const posibilityPach = maps.some((positionMap, indexX) => {
          const postionAuxMap = positionMap.some((item, indexY) => {
            if ([indexX, indexY].join() === position && item.type === "wall") {
              console.log([indexX, indexY].join());
              return true;
            }
          });
          if (postionAuxMap) {
            return true;
          }
        });
        if (posibilityPach) {
          return null;
        }
        return position;
      });
      console.log(posibiltyNewPath);
    }, 1000);
  }, []);

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
          <Button
            color="error"
            variant="contained"
            onClick={() => setResetPoints(!resetPoints)}
          >
            Resetar
          </Button>
        </BoxSpace>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div onClick={handleClick}>
            <InputKeyboard ref={ref} type="text" onKeyDown={handleDown} />
            <Maps
              positionPlayer={positionPlayer}
              positionPlayerIa={positionPlayerIa}
              pump={pump}
              positionRandomFruit={positionRandomFruit}
            />
          </div>
        </div>
      </Container>
      <ModalWinner isModalWinnerOpen={isModalWinnerOpen} />
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

  const positionPossibleFruit: string[] = [];
  maps.forEach((_, _X) => {
    _.forEach((matrix, _Y) => {
      if (matrix.type !== "wall") {
        positionPossibleFruit.push(`${_X},${_Y}`);
      }
    });
  });
  const positionPlayerRandom = positionPlayerInitialRandom();
  const positionIaRandom = positionPlayerInitialRandom();

  return {
    props: {
      positionWall: JSON.stringify(positionWall),
      positionPlayerRandom,
      fruitRandomPosition: JSON.stringify(positionPossibleFruit),
      positionIaRandom,
    },
  };
};
