import { Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const Header = () => {
  return (
    <Flex
      my={{ base: "4" }}
      color={theme.primaryTextColor}
      direction={"column"}
      textAlign={"center"}
      fontWeight="bold"
    >
      <Text fontSize={{ base: "xl", lg: "3xl" }}>Introducing Axle Token</Text>
      {/* <Text fontSize={{ base: "lg", lg: "xl" }}>A web3 Gaming token</Text> */}
    </Flex>
  );
};
export default Header;
