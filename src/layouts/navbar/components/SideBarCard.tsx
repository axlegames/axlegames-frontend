import { Flex } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const SideBarCard = (props: any) => {
  return (
    <Flex
      bg={theme.fgColor}
      p={"2"}
      borderRadius="2xl"
      direction={"column"}
      alignItems="flex-start"
      rowGap={".25rem"}
    >
      {props.children}
    </Flex>
  );
};

export default SideBarCard;
