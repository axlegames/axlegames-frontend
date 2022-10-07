import { Box } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const Key = (props: {
  letter: string;
  onKeyPress: Function;
  gotHit?: boolean;
}) => {
  const shadow = `0px -4px 0px 4px ${theme.bgColor}, 0px 0px 0px 4px ${theme.highLightColor}`;
  const highLightShadow = `0px 0px 0px 0px ${theme.highLightColor}, 0px 0px 0px 0px ${theme.bgColor}`;

  return (
    <Box
      cursor={"pointer"}
      onClick={() => props.onKeyPress(props.letter)}
      display={"flex"}
      fontSize={{ base: "12", md: "16", lg: "18", xl: "20" }}
      fontWeight="bolder"
      flexDirection="column"
      alignItems={"center"}
      justifyContent="center"
      height={{ base: "5", sm: "8", md: "12" }}
      width={{ base: "5", sm: "8", md: "12" }}
      bg={theme.fgColor}
      borderRadius={{ base: props.gotHit ? "lg" : "sm" }}
      border={props.gotHit ? `3px solid ${theme.highLightColor}` : "none"}
      color={theme.highLightColor}
      boxShadow={props.gotHit ? highLightShadow : shadow}
      _active={{
        boxShadow: highLightShadow,
        border: `3px solid ${theme.secondaryColor}`,
        borderRadius: "lg",
      }}
    >
      {props.letter.toLowerCase()}
    </Box>
  );
};

export default Key;
