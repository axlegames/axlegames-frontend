import { Box, Text } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

const WonModal = (props: any) => {
  return (
    <Box color={theme.highLightColor}>
      <Text>Congrats! you have won</Text>
    </Box>
  );
};
export default WonModal;
