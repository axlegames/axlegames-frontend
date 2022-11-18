import { Box } from "@chakra-ui/react";
import { theme } from "../../../../../config/theme.config";
import AbsurdleCell from "./AbsurdleCell";

const AbsurdleGrid = (props: any) => {
  return (
    <Box fontFamily={"quicksand"} fontSize="3xl" fontWeight={"bold"}>
      <Box
        bg={theme.bgColor}
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="center"
      >
        {props.game.map((row: any, CurrentRowindex: number) => (
          <Box key={CurrentRowindex} display={"flex"} flexDirection="row">
            {row.map((letter: any, currentCellIndex: number) => (
              <AbsurdleCell
                isCurrentRowCompleted={props.completedRows[CurrentRowindex]}
                keyPresence={
                  props.gameStatus[CurrentRowindex][currentCellIndex]
                }
                letter={letter}
                index={currentCellIndex}
                key={currentCellIndex}
              />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default AbsurdleGrid;
