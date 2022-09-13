import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { createRef, useEffect, useState } from "react";
import { Maps } from "../components/Maps/Maps";
import { movementPlayer } from "../player/movementPlayer";
import styles from "../styles/Home.module.css";
import { maps } from "../world/maps";
interface HomeProps {
  positionWall: string;
  positionPlayerRandom: string;
  fruitRandomPosition: string;
}
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
  const ref = createRef<HTMLInputElement>();

  const handleClick = () => {
    ref.current?.focus();
  };

  const [positionPlayer, setPositionPlayer] = useState(positionPlayerRandom);
  useEffect(() => {
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
      setPositionRandomFruit(newPostionFruitValid)
  }, []);
  useEffect(() => {
    if (pump.active) {
      setTimeout(() => setPump({ active: false, positionBomb: "" }), 5000);
    }
  }, [pump]);
  const handleDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.code);

    if (event.code === "Space") {
      setPump({ active: true, positionBomb: positionPlayer });
    }
    movementPlayer(
      event.code,
      setPositionPlayer,
      positionPlayer,
      positionsWall
    );
  };
  return (
    <div onClick={handleClick}>
      <input
        style={{
          position: "relative",
          top: 0,
          display: "flex",
          border: "none",
          width: ".1px",
          height: ".1px",
        }}
        ref={ref}
        type="text"
        onKeyDown={handleDown}
      />
      <Maps positionPlayer={positionPlayer} pump={pump} positionRandomFruit={positionRandomFruit} />
    </div>
  );
}

// export default Home

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
  let condition = false;
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
  } while (condition);
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
