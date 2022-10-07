import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

const SideBarButton = (props: any) => {
  return (
    <Button
      width={"100%"}
      variant={"ghost"}
      _hover={{ color: theme.primaryColor, bg: theme.bgColor }}
      justifyContent="flex-start"
      onClick={props.onClick}
    >
      <Flex alignItems={"center"} columnGap={"1rem"}>
        <Box>{props.icon}</Box>
        <Text>{props.title}</Text>
      </Flex>
    </Button>
  );
};

export default SideBarButton;
