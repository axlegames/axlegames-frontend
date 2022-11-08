import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import NeuButton from "../../Axle/component/NeuButton";

const challenges = [
  {
    task: "Complete task & win 600 GAMEIN",
    buttonText: "Submit Now",
  },
  {
    task: "Update Your profile and claim 150 GAMEIN",
    buttonText: "Update Now",
  },
  {
    task: "Play 2048 Game & win rewards",
    buttonText: "Play Now",
  },
  {
    task: "Vote & Earn on your fav cricket team",
    buttonText: "Vote Now",
  },

  {
    task: "Listing at $0.015, Buy at $0.005",
    buttonText: "Join Presale",
  },
];

const Challenges = () => (
  <Flex
    bg={theme.bgColor}
    p={4}
    rowGap="1rem"
    borderRadius="xl"
    direction={"column"}
  >
    <Text
      px={4}
      fontWeight={"bold"}
      fontSize={"3xl"}
      color={theme.primaryTextColor}
    >
      Complete & Earn
    </Text>
    {challenges.map((t, i) => (
      <Box
        borderRadius="lg"
        boxShadow={`-2px 2px 1px ${theme.primaryTwoTextColor}`}
        key={i}
      >
        <Grid
          fontWeight={"bold"}
          alignItems="center"
          gridColumnGap={"1rem"}
          justifyContent={"space-between"}
          rowGap="1rem"
          templateColumns={{ base: "1fr", md: "3fr 1fr" }}
          px={4}
          py={1}
        >
          <Text color={theme.secondaryTextColor}>{t.task}</Text>
          <Box mb={2}>
            <NeuButton
              width="100%"
              onClick={() => {}}
              bg={"#A34400"}
              shadow={"#FF7C1F"}
              label={t.buttonText}
            />
          </Box>
        </Grid>
      </Box>
    ))}
  </Flex>
);

export default Challenges;
