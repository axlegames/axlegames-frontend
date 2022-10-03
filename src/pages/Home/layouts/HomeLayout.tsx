import { Box } from "@chakra-ui/react";
import GamesView from "../views/GamesView";
import HowToPlayView from "../views/HowToPlayView";
import StatsView from "../views/StatsView";

const HomeLayout = () => {
  return (
    <Box>
      <GamesView />
      <HowToPlayView />
      <StatsView />
    </Box>
  );
};

export default HomeLayout;
