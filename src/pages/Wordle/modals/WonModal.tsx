import { Box, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import Lottie from "lottie-react";
import Won from "../../../assets/wordle/lottie/little-boy-with-thumbs-up.json";

const WonModal = (props: any) => {
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
        <Lottie animationData={Won} loop={false} />
      </Box>
      <Text fontSize="2xl">Congrats! you have won</Text>
    </Box>
  );
};
export default WonModal;
