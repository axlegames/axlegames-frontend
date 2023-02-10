import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { theme } from "../../../config/theme.config";

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
  const [currentTimer, setCurrentTimer] = useState(
    new Date(props.currentTime).getTime()
  );

  useEffect(() => {
    const calcualteRemainingTime = () => {
      const opensAt = new Date(props.opensAt).getTime();
      const remainingTimeForLobby = opensAt - currentTimer;

      const _isLobby =
        remainingTimeForLobby > 0 && remainingTimeForLobby < 5 * 1000 * 60
          ? true
          : false;

      const remainingTimeForLive =
        new Date(props.deadline).getTime() - currentTimer;

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
      const time = Date.parse(currentTime()) - currentTimer;
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
      setCurrentTimer(currentTimer + 1000);
    };

    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    const interval = setInterval(() => calcualteRemainingTime(), 1000);
    return () => clearInterval(interval);
  }, [props, currentTimer]);

  return (
    <Box>
      {isLoaded ? (
        <Box fontSize={"sm"} color={theme.secondaryTextColor}>
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
  );
};

export default Timer;
