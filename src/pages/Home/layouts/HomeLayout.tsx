import { Box } from "@chakra-ui/react";
import GamesView from "../views/GamesView";
import HowToPlayView from "../views/HowToPlayView";
import Footer from "../views/Footer";

const HomeLayout = () => {
  return (
    <Box pb={2}>
      <GamesView />
      <HowToPlayView />
      <Footer />
    </Box>
  );
};

export default HomeLayout;
