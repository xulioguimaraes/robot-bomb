import { maps } from "../../world/maps";
import bomb from "../../../public/bomb1.svg";
import player from "../../../public/player.svg";
import Image from "next/image";
interface MapsProps {
  positionPlayer: string;
  pump: {
    active: boolean;
    positionBomb: string;
  };
  positionRandomFruit: (string[] | undefined)[];
}
export const Maps = ({
  positionPlayer,
  pump,
  positionRandomFruit,
}: MapsProps) => {
  return (
    <>
      {maps.map((item, indexArray) => (
        <div key={indexArray} style={{ display: "flex" }}>
          {item.map((itemMatrix, indexMatrix) => {
            return (
              <div
                key={[indexArray, indexMatrix].join()}
                style={{
                  background:
                    [indexArray, indexMatrix].join() === positionPlayer
                      ? "#94a162"
                      : itemMatrix.background === ""
                      ? "#94a162"
                      : itemMatrix.background,
                  width: itemMatrix.width,
                  height: itemMatrix.heith,
                }}
              >
                {/* {itemMatrix.value} */}
                {[indexArray, indexMatrix].join() === positionPlayer && (
                  <>
                    <Image src={player} alt="player" />
                  </>
                )}
                {pump.active &&
                  pump.positionBomb === [indexArray, indexMatrix].join() && (
                    <>
                      <Image src={bomb} alt="bomb" />
                    </>
                  )}
                {positionRandomFruit.map((postion) => {
                  if (String(postion) === [indexArray, indexMatrix].join()) {
                    return (
                      <Image key={String(postion)} src={bomb} alt="bomb" />
                    );
                  }
                  return <></>;
                })}
                {/* { [indexArray, indexMatrix]} */}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};
