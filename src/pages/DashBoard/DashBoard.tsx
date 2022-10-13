import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";
import MainLayout from "../../layouts/MainLayout";
import ProfileCard from "./components/ProfileCard";
import Rewards from "./components/Rewards";
import LiveGames from "./sections/LiveGames";
import Referral from "./components/Referral";
import Challenges from "./components/Challenges";

const Dashboard = () => {
  return (
    <MainLayout>
      <Box
        bg={theme.fgColor}
        p={4}
        mx={4}
        my={12}
        borderRadius="xl"
        fontFamily={"quicksand"}
        pb={{ base: "40", xl: "20" }}
      >
        <Text
          p={4}
          fontSize={"2xl"}
          fontWeight="bold"
          color={theme.primaryTextColor}
        >
          Welcome! akashmrc98
        </Text>

        <Flex rowGap={"1rem"} direction={"column"}>
          <Grid
            columnGap={"1rem"}
            rowGap={"1rem"}
            templateColumns={{ base: "1fr", lg: "1fr 2fr", xl: "1fr 3fr" }}
          >
            <ProfileCard />
            <Rewards />
          </Grid>

          <Grid
            templateColumns={{ base: "0", sm: "1fr", xl: "1fr 1fr" }}
            display={{ base: "none", sm: "grid" }}
            columnGap="1rem"
            rowGap="1rem"
            borderRadius="2xl"
          >
            <Challenges />
            <Referral />
          </Grid>
          <LiveGames />
        </Flex>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
