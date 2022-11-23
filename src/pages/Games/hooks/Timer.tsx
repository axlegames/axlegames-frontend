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

  const getTime = () => {
    const time = Date.parse(props.opensAt) - new Date().getTime();
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const starts = new Date(props.startsOn).getTime() - new Date().getTime();
  const isStarted = starts < 0 ? true : false;

  const expires = new Date(props.deadline).getTime() - new Date().getTime();
  const isExpired = expires < 0 ? true : false;

  const timer = !isExpired
    ? `Entry closes in ${minutes}m ${seconds}s`
    : `Game Started`;

  return (
    <Box>
      <Text>
        {isLoaded ? <Box>{isStarted ? timer : null}</Box> : `Loading...`}
      </Text>
    </Box>
  );
};

export default Timer;
