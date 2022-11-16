import { Box, Flex } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";
import MainLayout from "../../layouts/MainLayout";
import GameHistoryAndChallenges from "./views/GameHistoryAndChallenges";
import RewardsAndProfile from "./views/RewardsAndProfile";

const Dashboard = () => {
  return (
    <MainLayout>
      <Box
        bg={theme.fgColor}
        p={6}
        mx={4}
        my={12}
        borderRadius="xl"
        fontFamily={"quicksand"}
      >
        <Flex rowGap={"1rem"} direction={"column"}>
          <RewardsAndProfile />
          <GameHistoryAndChallenges />
        </Flex>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
