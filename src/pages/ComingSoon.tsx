import { Box, Text } from "@chakra-ui/react";
import { theme } from "../config/theme.config";
import MainLayout from "../layouts/MainLayout";

const ComingSoon = () => {
  return (
    <MainLayout>
      <Box
        rowGap={"2rem"}
        display={"flex"}
        flexDirection="column"
        alignItems={"center"}
        justifyContent="center"
        alignSelf={"center"}
      >
        <Box
          py={4}
          px={8}
          display={"flex"}
          flexDirection="column"
          alignItems={"center"}
          fontFamily={"'Press Start 2P', cursive"}
          fontSize={{ base: "xl", md: "5xl", lg: "7xl" }}
          color={theme.primaryTwoTextColor}
          justifyContent="center"
          mt={12}
          bg={theme.ternaryButtonColor}
          borderRadius={"xl"}
        >
          <Text>Coming Soon</Text>
        </Box>

        <Text
          fontFamily={"quicksand"}
          fontWeight="bold"
          fontSize={{ base: "md", md: "xl", lg: "3xl" }}
          color={theme.primaryTextColor}
          textAlign="center"
          px={2}
        >
          We are preparing something exciting & amazing for you.
        </Text>
      </Box>
    </MainLayout>
  );
};

export default ComingSoon;
