import { Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const Tag = (props: any) => {
  return (
    <Flex
      direction={"row"}
      justifyContent="space-between"
      alignItems={"center"}
      columnGap={{ base: "3rem" }}
      fontSize={{ xl: "md" }}
      boxShadow={`-2px 2px 1px ${theme.primaryTwoTextColor}`}
      p={2}
      borderRadius="lg"
    >
      <Text color={theme.primaryTwoTextColor}>{props.name}</Text>
      <Text color={theme.secondaryTextColor}>{props.value}</Text>
    </Flex>
  );
};

export default Tag;
