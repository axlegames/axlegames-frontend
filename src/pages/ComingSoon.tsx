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
          fontSize={"9xl"}
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
          fontSize={"5xl"}
          color={theme.primaryTextColor}
        >
          We are preparing something exciting & amazing for you.
        </Text>
      </Box>
    </MainLayout>
  );
};

export default ComingSoon;
