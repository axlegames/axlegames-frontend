import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";
import MainLayout from "../../layouts/MainLayout";
import ProfileCard from "./components/ProfileCard";
import Rewards from "./components/Rewards";
import Referral from "./components/Referral";
import Challenges from "./components/Challenges";
import GameHistory from "./components/GameHistory";

const Dashboard = () => {
  return (
    <MainLayout>
      <Text
        px={6}
        fontSize={"3xl"}
        fontWeight="bold"
        color={theme.primaryTextColor}
        fontFamily={"quicksand"}
      >
        Welcome! akashmrc98
      </Text>
      <Box
        bg={theme.fgColor}
        p={6}
        mx={4}
        my={12}
        borderRadius="xl"
        fontFamily={"quicksand"}
      >
        <Flex rowGap={"1rem"} direction={"column"}>
          <Grid
            columnGap={"1rem"}
            rowGap={"1rem"}
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          >
            <Rewards />
            <ProfileCard />
          </Grid>

          <Grid
            templateColumns={{ base: "1fr", "2xl": "1fr 1fr" }}
            columnGap="1rem"
            rowGap="1rem"
            borderRadius="2xl"
          >
            <Challenges />
            <GameHistory />
          </Grid>

          <Referral />
        </Flex>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
