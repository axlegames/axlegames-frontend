import { Button } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const TransactionsBarTile = (props: any) => {
  return (
    <Button
      size={"m"}
      height={"100%"}
      width="100%"
      borderRadius={"2xl"}
      px={{ base: "6" }}
      bg={props.isActive ? theme.primaryButtonColor : theme.bgColor}
      color={props.isActive ? theme.bgColor : theme.primaryTextColor}
      display={{ base: "none", xl: "flex" }}
      justifyContent="space-evenly"
      alignItems="center"
      onClick={props.onClick}
      p={4}
    >
      {props.title}
    </Button>
  );
};

export default TransactionsBarTile;
