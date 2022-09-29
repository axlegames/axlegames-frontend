import { Box, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const HeadLine = () => {
  return (
    <Box
      fontFamily={"quicksand"}
      fontWeight="bold"
      bg={theme.primaryColor}
      color={theme.bgColor}
      justifyContent="center"
    >
      <Text textAlign={"center"}>Axle games launch soon</Text>
    </Box>
  );
};

export default HeadLine;
