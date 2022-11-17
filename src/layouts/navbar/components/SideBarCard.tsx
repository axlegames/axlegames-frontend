import { Flex, useMediaQuery } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const SideBarCard = (props: any) => {
  const [isMobile] = useMediaQuery("(max-width: 900px)");
  return (
    <Flex
      bg={theme.fgColor}
      p={"2"}
      borderRadius="2xl"
      direction={"column"}
      alignItems="flex-start"
      rowGap={".25rem"}
      m={isMobile ? 4 : 0}
    >
      {props.children}
    </Flex>
  );
};

export default SideBarCard;
