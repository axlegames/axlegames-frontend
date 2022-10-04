import { Box, Grid, GridItem } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";

import Navbar from "./components/navbars/Navbar";
import MobileNavbar from "./components/navbars/MobileNavbar";

import HomeLayout from "./layouts/HomeLayout";
import SideBarLayout from "./layouts/SideBarLayout";
import { createContext, useState } from "react";

export const WalletContext = createContext(false);

const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      maxHeight={"100vh"}
      overflowX="hidden"
      overflowY="hidden"
      bg={theme.bgColor}
    >
      <Navbar
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      />
      <MobileNavbar />
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "2fr 8fr",
        }}
      >
        <GridItem
          overflowY={"hidden"}
          maxWidth="380px"
          minWidth={"360px"}
          display={{ base: "none", lg: "flex" }}
          justifyContent="center"
        >
          <SideBarLayout
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
          />
          ;
        </GridItem>
        <GridItem maxHeight={"90vh"} overflowY={"scroll"}>
          <HomeLayout />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
