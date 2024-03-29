import { Button } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

const GameBarTile = (props: any) => {
  return (
    <Button
      transition={"300ms all ease-in"}
      height={"100%"}
      width="100%"
      borderRadius={"2xl"}
      py={2}
      px={{ base: "6" }}
      bg={props.isActive ? theme.primaryButtonColor : theme.bgColor}
      color={props.isActive ? theme.bgColor : theme.primaryTextColor}
      display={{ base: "none", xl: "flex" }}
      justifyContent="space-evenly"
      alignItems="center"
      onClick={props.onClick}
    >
      {props.title}
    </Button>
  );
};

export default GameBarTile;
