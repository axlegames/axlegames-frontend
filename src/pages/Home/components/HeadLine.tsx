import { theme } from "../../../config/theme.config";
import { SiEthereum } from "react-icons/si/index";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

const HeadLine = () => {
  return (
    <Box
      bg={theme.fgColor}
      color={theme.bgColor}
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
          color: theme.primaryColor,
          bg: theme.bgColor,
        }}
        borderRadius={"2xl"}
        bg={theme.primaryColor}
        shadow="2xl"
      >
        <Flex columnGap={".5rem"}>
          <Text>Buy Axle</Text>
          <SiEthereum color={theme.fgColor} />
        </Flex>
      </Button>
    </Box>
  );
};

export default HeadLine;
