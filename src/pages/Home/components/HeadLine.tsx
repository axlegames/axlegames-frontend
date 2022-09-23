import { theme } from "../../../config/theme.config";
import { SiEthereum } from "react-icons/si/index";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

const HeadLine = () => {
  return (
    <Box
      bg={theme.fgColor}
      color={theme.primaryColor}
      maxHeight="10vh"
      fontFamily="quicksand"
      px={{ base: "12" }}
      py={{ base: "4" }}
      fontWeight={"bold"}
      alignItems="center"
      justifyContent={{ lg: "flex-end" }}
      display={{ base: "none", lg: "flex" }}
    >
      <Button
        _hover={{
          color: theme.bgColor,
          bg: theme.highLightColor,
        }}
        borderRadius={"2xl"}
        bg={theme.bgColor}
        shadow="2xl"
      >
        <Flex columnGap={".5rem"}>
          <Text>Buy Axle</Text>
          <SiEthereum color={theme.primaryColor} />
        </Flex>
      </Button>
    </Box>
  );
};

export default HeadLine;
