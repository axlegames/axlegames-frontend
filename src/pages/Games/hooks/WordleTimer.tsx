import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { theme } from "../../../config/theme.config";

interface Props {
  deadline: string;
  isLoaded: boolean;
  endgame: Function;
}

const WordleTimer = (props: Props) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    const time =
      Date.parse(props.deadline || "") - new Date(Date.now()).getTime();
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
    if (time < 0) {
      props.endgame();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timeFormatter = (x: number) => {
    let s = x.toString().trim().replace("-", "");
    if (s.length <= 1) return "0" + s;
    return s;
  };

  return (
    <Box bg={theme.bgColor} display="flex" justifyContent={"center"}>
      {props.isLoaded ? (
        <Box
          left={"8%"}
          position={"absolute"}
          fontSize={{ base: "xl", md: "3xl" }}
          fontWeight="bold"
          fontFamily="quicksand"
          color={theme.secondaryButtonColor}
          borderRadius={"xl"}
          flexDirection="column"
          rowGap={"1rem"}
          p={4}
          mt={12}
        >
          <Text textAlign={"center"} color={theme.primaryTextColor}>
            Expires In
          </Text>
          <Box
            fontSize={{ base: "xl", md: "3xl" }}
            fontWeight="bold"
            fontFamily="quicksand"
            color={theme.secondaryButtonColor}
            borderRadius={"xl"}
            display={"flex"}
            columnGap=".5rem"
          >
            <Box minW="5vw" borderRadius={"lg"} py={2} px={4} shadow="dark-lg">
              {timeFormatter(minutes)}m
            </Box>
            <Box
              minW="5vw"
              borderRadius={"lg"}
              py={2}
              px={4}
              shadow="dark-lg"
              bg={theme.bgColor}
            >
              {timeFormatter(seconds)}s
            </Box>
          </Box>
        </Box>
      ) : (
        "Loading..."
      )}
    </Box>
  );
};

export default WordleTimer;
