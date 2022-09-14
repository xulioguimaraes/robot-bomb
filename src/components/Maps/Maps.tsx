import { maps } from "../../world/maps";
import { Image } from "./Image";
import { BoxCenter } from "./BoxCenter";
interface MapsProps {
  positionPlayer: string;
  positionPlayerIa: string;
  pump: {
    active: boolean;
    positionBomb: string;
  };
  positionRandomFruit: (string[] | undefined)[];
}

export const Maps = ({
  positionPlayer,
  positionPlayerIa,
  pump,
  positionRandomFruit,
}: MapsProps) => {
  return (
    <>
      {maps.map((item, indexArray) => (
        <div key={indexArray} style={{ display: "flex" }}>
          {item.map((itemMatrix, indexMatrix) => {
            return (
              <BoxCenter
                key={[indexArray, indexMatrix].join()}
                sx={{
                  background:
                    [indexArray, indexMatrix].join() === positionPlayer
                      ? "#8d5000c4"
                      : itemMatrix.background === ""
                      ? "#8d5000c4"
                      : itemMatrix.background,
                }}
              >
                {[indexArray, indexMatrix].join() === positionPlayer && (
                  <>
                    <Image
                      key={[indexArray, indexMatrix].join()}
                      src="https://www.svgrepo.com/show/62629/robot.svg"
                      alt="player"
                      width={"48px"}
                      height="43px"
                    />
                  </>
                )}
                {itemMatrix.type === "wall" && (
                  <>
                    <Image
                      key={[indexArray, indexMatrix].join()}
                      src="https://www.svgrepo.com/show/157312/tree.svg"
                      alt="player"
                      width={"100%"}
                      height="43px"
                    />
                  </>
                )}
                {[indexArray, indexMatrix].join() === positionPlayerIa && (
                  <>
                    <Image
                      key={[indexArray, indexMatrix].join()}
                      src="https://www.svgrepo.com/show/40641/robot.svg"
                      alt="player"
                      width={"48px"}
                      height="43px"
                    />
                  </>
                )}
                {positionRandomFruit.map((postion) => {
                  if (String(postion) === [indexArray, indexMatrix].join()) {
                    return (
                      <Image
                        key={String(postion)}
                        src="http://simpleicon.com/wp-content/uploads/coin-money-9-64x64.png"
                        alt="bomb"
                        width={"33px"}
                      />
                    );
                  }
                  return <></>;
                })}
              </BoxCenter>
            );
          })}
        </div>
      ))}
    </>
  );
};
