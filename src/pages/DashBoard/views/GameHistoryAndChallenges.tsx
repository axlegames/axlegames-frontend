import { Grid } from "@chakra-ui/react";
import Challenges from "../components/Challenges";
import GameHistory from "../components/GameHistory";

const GameHistoryAndChallenges = () => {
  return (
    <Grid
      templateColumns={{ base: "1fr", "2xl": "1fr 1fr" }}
      columnGap="1rem"
      rowGap="1rem"
      borderRadius="2xl"
    >
      <GameHistory />
      <Challenges />
    </Grid>
  );
};

export default GameHistoryAndChallenges;
