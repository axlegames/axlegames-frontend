import { Box } from "@chakra-ui/react";
import AIWordleCell from "./AIWordleCell";

const AIWordleGrid = (props: any) => {
  return (
    <Box fontFamily={"quicksand"} fontSize="3xl" fontWeight={"bold"}>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="center"
      >
        {props.game.map((row: any, CurrentRowindex: number) => (
          <Box key={CurrentRowindex} display={"flex"} flexDirection="row">
            {row.map((letter: any, currentCellIndex: number) => (
              <AIWordleCell
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
export default AIWordleGrid;
