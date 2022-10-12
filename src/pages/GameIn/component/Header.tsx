import { Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const Header = () => {
  return (
    <Flex
      my={{ base: "8" }}
      color={theme.primaryTextColor}
      direction={"column"}
      textAlign={"center"}
      fontWeight="bold"
    >
      <Text fontSize={{ base: "xl", lg: "3xl" }}>
        The Gaming Network Currency
      </Text>
      <Text fontSize={{ base: "lg", lg: "xl" }}>Introducing GAMEIN Token</Text>
    </Flex>
  );
};
export default Header;
