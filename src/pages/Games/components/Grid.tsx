import { Box } from "@chakra-ui/react";
import Cell from "./Cell";

const Grid = (props: any) => {
  return (
    <Box p={4} fontFamily={"quicksand"} fontSize="3xl" fontWeight={"bold"}>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="center"
      >
        {props.game.map((row: any, CurrentRowindex: number) => (
          <Box key={CurrentRowindex} display={"flex"} flexDirection="row">
            {row.map((letter: any, currentCellIndex: number) => (
              <Cell
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
export default Grid;
