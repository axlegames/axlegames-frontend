import { Button } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

const GameBarTile = (props: any) => {
  return (
    <Button
      size={"sm"}
      height={"100%"}
      width="100%"
      borderRadius={"2xl"}
      px={{ base: "6" }}
      bg={props.isActive ? theme.primaryColor : theme.bgColor}
      color={props.isActive ? theme.bgColor : theme.primaryColor}
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
