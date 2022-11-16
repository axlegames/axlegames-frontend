import { Box } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

interface Props {
  letter: string;
  isCurrentRowCompleted: boolean;
  keyPresence: string;
  index: number;
}

const Cell = (props: Props) => {
  const validate = () => {
    if (props.isCurrentRowCompleted) {
      if (props.keyPresence === "absent") return "red.400";
      if (props.keyPresence === "present") return "yellow.500";
      if (props.keyPresence === "correct") return "green.500";
    }
    return props.letter !== ""
      ? theme.secondaryTextColor
      : theme.highLightColor;
  };

  return (
    <Box
      key={props.index}
      margin={"1"}
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      justifyContent="center"
      width={{ base: "10", sm: "12", md: "16" }}
      height={{ base: "10", sm: "12", md: "16" }}
      bg={validate()}
      transform={
        props.isCurrentRowCompleted ? "rotateX(360deg)" : "rotateX(0deg)"
      }
      transitionDuration={`${props.index + 7}00ms`}
      transitionDelay={`${props.index + 5}00ms`}
      transitionTimingFunction="ease-in"
      transitionProperty={"all"}
      borderRadius="md"
      autoCapitalize="true"
    >
      {props.letter}
    </Box>
  );
};

export default Cell;
