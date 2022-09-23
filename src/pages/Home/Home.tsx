import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";

import HeadLine from "./components/HeadLine";

import GamesLayout from "./layouts/GamesLayout";
import HighLightsLayout from "./layouts/HighLightsLayout";
import HowToPlayLayout from "./layouts/HowToPlayLayout";
import StatsLayout from "./layouts/StatsLayout";
import SideBarLayout from "./layouts/SideBarLayout";
import MobileNavbarLayout from "./layouts/MobileNavbarLayout";

const Home = () => {
  return (
    <Box maxHeight={"100vh"} overflowY="hidden" bg={theme.bgColor}>
      <HeadLine />
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
          <Flex display={{ base: "flex", lg: "none" }}>
            <MobileNavbarLayout />
          </Flex>
          <HighLightsLayout />
          <GamesLayout />
          <HowToPlayLayout />
          <StatsLayout />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
