import { Box, Grid, GridItem } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";

import Navbar from "./components/navbars/Navbar";
import MobileNavbar from "./components/navbars/MobileNavbar";

import HomeLayout from "./layouts/HomeLayout";
import SideBarLayout from "./layouts/SideBarLayout";
import { createContext, useRef, useState } from "react";

export const WalletContext = createContext(false);

const Home = () => {
  const [open, setOpen] = useState(false);
  const scrollUpFun = () => ref.current.scroll({ top: 0, behavior: "smooth" });
  const ref = useRef<any>(null);

  return (
    <Box maxHeight={"100vh"} overflowX="hidden" bg={theme.bgColor}>
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
        <GridItem ref={ref}>
          <Navbar
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
          />
          <HomeLayout />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
