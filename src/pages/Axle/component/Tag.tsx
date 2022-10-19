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
    >
      <Text color={theme.primaryTwoTextColor}>{props.name}</Text>
      <Text color={theme.secondaryTextColor}>{props.value}</Text>
    </Flex>
  );
};

export default Tag;
