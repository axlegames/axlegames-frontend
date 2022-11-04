import Footer from "./views/Footer";
import GamesView from "./views/GamesView";
import MainLayout from "../../layouts/MainLayout";
import { Box } from "@chakra-ui/react";
// import HowToPlayView from "./views/HowToPlayView";

const Home = () => {
  return (
    <MainLayout>
      <GamesView />
      {/* <HowToPlayView /> */}
      <Box pt={"14vh"}>
        <Footer />
      </Box>
    </MainLayout>
  );
};

export default Home;
