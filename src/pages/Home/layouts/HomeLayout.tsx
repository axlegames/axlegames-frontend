import { Box } from "@chakra-ui/react";
import GamesView from "../views/GamesView";
import HowToPlayView from "../views/HowToPlayView";
import Footer from "../views/Footer";

const HomeLayout = () => {
  return (
    <Box>
      <GamesView />
      <HowToPlayView />
      <Footer />
    </Box>
  );
};

export default HomeLayout;
