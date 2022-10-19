import { Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const AxleHeader = () => {
  return (
    <Flex
      my={{ base: "4" }}
      direction={"column"}
      textAlign={"center"}
      fontWeight="bold"
    >
      <Text color={theme.primaryTextColor} fontSize={{ base: "xl", lg: "3xl" }}>
        Introducing Axle Token
      </Text>
      <Text
        color={theme.primaryTwoTextColor}
        fontSize={{ base: "lg", lg: "xl" }}
      >
        A web3 Gaming token
      </Text>
    </Flex>
  );
};
export default AxleHeader;
