import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface Props {
  deadline: string;
  startsOn: string;
  opensAt: string;
  currentTime: string;
}
const Timer = (props: Props) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLobby, setIsLobby] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const calcualteRemainingTime = () => {
    const remainingTimeForLobby =
      new Date(props.opensAt).getTime() - new Date().getTime();

    const _isLobby =
      remainingTimeForLobby > 0 && remainingTimeForLobby < 5 * 1000 * 60
        ? true
        : false;

    const remainingTimeForLive =
      new Date(props.deadline).getTime() - new Date().getTime();

    const _isLive =
      remainingTimeForLive > 0 && remainingTimeForLive < 5 * 1000 * 60
        ? true
        : false;

    setIsLobby(_isLobby);
    const currentTime = () => {
      if (_isLobby) return props.opensAt;
      if (_isLive) return props.deadline;
      return props.deadline;
    };

    setIsLive(_isLive);
    const time = Date.parse(currentTime()) - new Date().getTime();
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    const interval = setInterval(() => calcualteRemainingTime(), 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Text>
        <Box>
          {isLoaded ? (
            <Box>
              {isLobby ? (
                <Box>{`closes in ${minutes}m ${seconds}s`}</Box>
              ) : (
                <Box>{`${isLive ? `In progress` : ""}`}</Box>
              )}
            </Box>
          ) : (
            <Box>{`Loading...`}</Box>
          )}
        </Box>
      </Text>
    </Box>
  );
};

export default Timer;
