import { Box, Grid, GridItem } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";

import Navbar from "./components/navbars/Navbar";
import MobileNavbar from "./components/navbars/MobileNavbar";

import HomeLayout from "./layouts/HomeLayout";
import SideBarLayout from "./layouts/SideBarLayout";

const Home = () => {
  return (
    <Box maxHeight={"100vh"} overflowY="hidden" bg={theme.bgColor}>
      <Navbar />
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
          <SideBarLayout />;
        </GridItem>
        <GridItem maxHeight={"90vh"} overflowY={"scroll"}>
          <HomeLayout />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
