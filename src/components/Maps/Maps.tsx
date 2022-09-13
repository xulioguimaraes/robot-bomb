import { maps } from "../../world/maps";
import bomb from "../../../public/bomb1.svg";
import player from "../../../public/player.svg";
import { CardMedia, styled } from "@mui/material";
interface MapsProps {
  positionPlayer: string;
  pump: {
    active: boolean;
    positionBomb: string;
  };
  positionRandomFruit: (string[] | undefined)[];
}
const Image = styled("img")(({ theme }) => ({
  position: "absolute",
}));
const BoxCenter = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "48px",
  height: "43px",
}));
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
              <BoxCenter
                key={[indexArray, indexMatrix].join()}
                sx={{
                  background:
                    [indexArray, indexMatrix].join() === positionPlayer
                      ? "#94a162"
                      : itemMatrix.background === ""
                      ? "#94a162"
                      : itemMatrix.background,
                }}
              >
                {/* {itemMatrix.value} */}
                {[indexArray, indexMatrix].join() === positionPlayer && (
                  <>
                    <Image
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
                {/* { [indexArray, indexMatrix]} */}
              </BoxCenter>
            );
          })}
        </div>
      ))}
    </>
  );
};
