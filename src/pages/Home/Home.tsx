import { Box, Grid, GridItem } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";

import Navbar from "./components/navbars/Navbar";
import MobileNavbar from "./components/navbars/MobileNavbar";

import SideBarLayout from "./layouts/SideBarLayout";
import { useRef, useState } from "react";
import GamesView from "./views/GamesView";
import HowToPlayView from "./views/HowToPlayView";
import Footer from "./views/Footer";

const Home = () => {
  const [open, setOpen] = useState(false);
  const scrollUpFun = () => ref.current.scroll({ top: 0, behavior: "smooth" });
  const ref = useRef<any>(null);

  return (
    <Box maxHeight={"100vh"} overflow="hidden" bg={theme.bgColor}>
      <MobileNavbar />
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "2fr 8fr",
        }}
      >
        <GridItem
          maxWidth="380px"
          minWidth={"360px"}
          display={{ base: "none", lg: "flex" }}
          justifyContent="center"
        >
          <SideBarLayout
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            scrollTop={() => scrollUpFun()}
          />
        </GridItem>
        <GridItem maxH={"100vh"} overflowY="scroll" ref={ref}>
          <Navbar
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
          />
          <GamesView />
          <HowToPlayView />
          <Footer />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
