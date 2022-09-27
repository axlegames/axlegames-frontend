import { Box, Text } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

const LostModal = (props: any) => {
  return (
    <Box color={theme.highLightColor}>
      <Text>Oh! better luck next time</Text>
    </Box>
  );
};
export default LostModal;
