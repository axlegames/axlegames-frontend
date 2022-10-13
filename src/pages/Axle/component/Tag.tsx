import { Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const Tag = (props: any) => {
  return (
    <Flex
      color={theme.secondaryTextColor}
      direction={"row"}
      justifyContent="space-between"
      alignItems={"center"}
      columnGap={{ base: "3rem" }}
      fontSize={{ xl: "md" }}
    >
      <Text>{props.name}</Text>
      <Text>{props.value}</Text>
    </Flex>
  );
};

export default Tag;
