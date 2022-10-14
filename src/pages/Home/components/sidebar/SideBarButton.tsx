import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useLocation } from "react-router";
import { theme } from "../../../../config/theme.config";

const SideBarButton = (props: any) => {
  const location = useLocation();
  const isActive = props.link === location.pathname;

  const variant = isActive ? "solid" : "ghost";
  const color = isActive ? theme.primaryTextColor : theme.secondaryTextColor;
  const bg = isActive ? theme.bgColor : theme.fgColor;

  return (
    <Button
      bg={bg}
      color={color}
      width={"100%"}
      variant={variant}
      size={{ base: "sm" }}
      onClick={props.onClick}
      justifyContent="flex-start"
      _hover={{ color: theme.primaryTextColor, bg: theme.bgColor }}
    >
      <Flex alignItems={"center"} columnGap={"1rem"}>
        <Box>{props.icon}</Box>
        <Text>{props.title}</Text>
      </Flex>
    </Button>
  );
};

export default SideBarButton;
