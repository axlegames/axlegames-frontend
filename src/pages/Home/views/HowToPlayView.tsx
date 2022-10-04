import { Box, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const HowToPlayView = () => {
  return (
    <Box
      minH={{ base: "90vh" }}
      color={theme.highLightColor}
      fontFamily={"quicksand"}
      fontWeight="bold"
      display={"flex"}
      flexDirection="column"
      justifyContent={"center"}
      p={{ base: "2", md: "8", lg: "16", xl: "32" }}
      px={{ "2xl": "64" }}
      rowGap={{ base: "2rem" }}
    >
      <Text fontSize={{ base: "4xl", md: "5xl", xl: "6xl" }} textAlign="center">
        How To Play
      </Text>
      <Text
        fontSize={{ base: "smaller", md: "medium", xl: "xl" }}
        textAlign={"center"}
      >
        Axle Games is an all new crypto-based fantasy trivia game! Join contests
        about what you love - crypto, cricket, football, pop culture and many
        more. Answer simple questions and win huge prizes (in crypto!). Don’t
        settle for enough. Go for more!
      </Text>
    </Box>
  );
};

export default HowToPlayView;
