import { Box, Text } from "@chakra-ui/react";

import Lottie from "lottie-react";
import { theme } from "../../../config/theme.config";

import Lost from "../../../assets/wordle/lottie/little-boy-crying.json";

const LostModal = (props: any) => {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      justifyContent={"center"}
      alignItems="center"
      rowGap={"1rem"}
      color={theme.highLightColor}
    >
      <Box maxW={"xs"} maxH={"xs"}>
        <Lottie animationData={Lost} loop={false} />
      </Box>
      <Text fontSize="2xl">Oh! better luck next time</Text>
    </Box>
  );
};
export default LostModal;
