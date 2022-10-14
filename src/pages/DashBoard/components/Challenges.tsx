import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

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
      fontSize={"2xl"}
      color={theme.primaryTextColor}
    >
      Complete & Earn
    </Text>
    {challenges.map((t, i) => (
      <Box
        borderRadius="xl"
        boxShadow={`0px 2px 1px ${theme.secondaryTextColor}`}
        key={i}
      >
        <Flex
          fontWeight={"bold"}
          alignItems="center"
          gridColumnGap={"3rem"}
          justifyContent={"space-between"}
          px={4}
          py={1}
        >
          <Text fontSize={"sm"} color={theme.secondaryTextColor}>
            {t.task}
          </Text>
          <Button
            bg={theme.secondaryButtonColor}
            color={theme.secondaryTwoTextColor}
            mb={2}
            size="sm"
          >
            {t.buttonText}
          </Button>
        </Flex>
      </Box>
    ))}
  </Flex>
);

export default Challenges;
