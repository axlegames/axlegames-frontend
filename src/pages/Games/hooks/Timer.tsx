import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface Props {
  deadline: string;
  startsOn: string;
  opensAt: string;
}
const Timer = (props: Props) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const getTime = (ftime: any) => {
    const time = Date.parse(ftime) - new Date().getTime();
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    const opens = new Date(props.startsOn).getTime() - new Date().getTime();
    const isOpened = opens < 0 ? true : false;
    const currentTime = isOpened ? props.deadline : props.startsOn;
    const interval = setInterval(() => getTime(currentTime), 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const starts = new Date(props.startsOn).getTime() - new Date().getTime();
  const isStarted = starts < 0 ? true : false;

  return (
    <Box>
      {isStarted ? (
        <Text>
          {isLoaded ? (
            <Box>{`expires in ${minutes}m ${seconds}s`}</Box>
          ) : (
            `Loading...`
          )}
        </Text>
      ) : null}
    </Box>
  );
};

export default Timer;
