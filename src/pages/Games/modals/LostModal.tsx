import { Box, Divider, Text } from "@chakra-ui/react";

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
      <Divider
        py={1}
        boxShadow={`-1p -1px 12px ${theme.bgColor}`}
        backgroundImage={`linear-gradient(to bottom, #eb6612, #ee2e4c, #d4007c, #9828a3, #1442b5)`}
        borderRadius={"xl"}
      />
      <Text fontSize="2xl">Oh! better luck next time</Text>
      <Divider
        py={1}
        boxShadow={`-1p -1px 12px ${theme.bgColor}`}
        backgroundImage={`linear-gradient(to bottom, #eb6612, #ee2e4c, #d4007c, #9828a3, #1442b5)`}
        borderRadius={"xl"}
      />
    </Box>
  );
};
export default LostModal;
