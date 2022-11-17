import { Box, Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const HighLightButton = (props: any) => {
  return (
    <Box
      alignSelf={"center"}
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
      bg={theme.primaryButtonColor}
      color={theme.bgColor}
      boxShadow={`0px 0px 8px ${theme.primaryButtonColor}`}
      transition={"all 100ms ease-in"}
      onClick={props.click}
      maxWidth={{ lg: "236px" }}
      minWidth={{ lg: "236px" }}
      height={{ base: "12" }}
      borderRadius="xl"
      cursor={"pointer"}
      _hover={{
        boxShadow: `0px 0px 0px ${theme.bgColor}`,
      }}
    >
      <Flex
        justifyContent={"space-evenly"}
        columnGap=".4rem"
        alignItems="center"
      >
        <props.icon size={32} color={theme.bgColor}></props.icon>
        <Text fontSize={"20"}>{props.title}</Text>
      </Flex>
    </Box>
  );
};

export default HighLightButton;
