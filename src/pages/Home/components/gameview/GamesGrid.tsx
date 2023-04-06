import { Box, Grid } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";
import GameCard from "./GameCard";

const GamesGrid = (props: any) => {
  const colors = [
    "#8BBCCC",
    "#31C6D4",
    "#00FFD1",
    "#E1FFB1",
    "#FCFFB2",
    "#C7F2A4",
    "#F8EDE3",
    "#AEBDCA",
    "#FFE3E1",
    "#FFE6F7",
    "#FF9494",
    "#FBF2CF",
  ];
  return (
    <Box
      bgColor={theme.bgColor}
      p={{ base: "4" }}
      borderBottomRadius={"2xl"}
      borderRadius={{ base: "2xl" }}
    >
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
          "2xl": "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {props.axleGames.map((axleGame: any, index: number) => (
          <GameCard
            key={index}
            index={index}
            axleGame={axleGame}
            colors={colors}
            openModal={() => props.openModal(axleGame, index)}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default GamesGrid;
