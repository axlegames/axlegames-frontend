import { Box, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { theme } from "../../../config/theme.config";
import { GameStatus } from "../../Home/enums/contests.enum";

interface Props {
  deadline: string;
  startsIn: string;
  opensAt: string;
  action: Function;
  gameType: string;
  currentTime: string;
  status: GameStatus;
  contestId: string;
  name: string;
  contestName: string;
}

const TimerButtonForSpecialGame = (props: Props) => {
  const [isLive, setIsLive] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date(props.currentTime).getTime()
  );

  useEffect(() => {
    const calcualteRemainingTime = () => {
      const remainingTimeToStart =
        new Date(props.startsIn).getTime() - currentTime;
      const _isStarted = remainingTimeToStart < 0 ? true : false;
      setIsStarted(_isStarted);

      const remainingTimeForLive =
        new Date(props.opensAt).getTime() - currentTime;
      const _isLive = remainingTimeForLive < 0 ? true : false;
      setIsLive(_isLive);

      const remainingTimeForExpiry =
        new Date(props.deadline).getTime() - currentTime;
      const _isExpired = remainingTimeForExpiry < 0 ? true : false;
      setIsExpired(_isExpired);

      const time = Date.parse(props.startsIn) - currentTime;
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));

      const _currentTime = currentTime + 1000;
      setCurrentTime(_currentTime);
    };

    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    const interval = setInterval(() => calcualteRemainingTime(), 1000);
    return () => clearInterval(interval);
  }, [currentTime, props]);

  const CurrentButtonStatus = () => {
    if (!isStarted) {
      return (
        <Button
          size="sm"
          border="none"
          outline={"none"}
          transition={`all`}
          boxShadow={`3px 3px 12px ${theme.bgColor}`}
          bg={"#F2CD5C"}
          transitionDuration={"200ms"}
          transitionTimingFunction="ease-in-out"
          width={"36"}
          _hover={{
            bg: "#F2921D",
          }}
          color="black"
        >
          {" "}
          {!isLoaded ? `Loading...` : `opens in ${minutes}m ${seconds}s`}
        </Button>
      );
    }
    if (isStarted && !isLive) {
      return (
        <Button
          color="black"
          onClick={() => props.action()}
          border="none"
          outline={"none"}
          transition={`all`}
          boxShadow={`3px 3px 12px ${theme.bgColor}`}
          size="sm"
          bg={"#03C988"}
          transitionDuration={"200ms"}
          transitionTimingFunction="ease-in-out"
          width={"36"}
          _hover={{
            bg: "#3CCF4E",
          }}
        >
          {!isLoaded ? `Loading...` : "Play"}
        </Button>
      );
    }

    if (isStarted && isLive && !isExpired) {
      return (
        <Button disabled size="sm" width={"36"} color="black">
          {!isLoaded ? `Loading...` : "Entry Closed"}
        </Button>
      );
    }
  };
  const contestName = props.contestName.split("-");
  const contestNumber = contestName[2] + "-" + contestName[3];

  const navigate = useNavigate();

  return (
    <Box>
      <Box>{CurrentButtonStatus()}</Box>
      <Box mt={2}>
        {isStarted && isLive ? (
          <Button
            onClick={() =>
              navigate(
                `/leaderboard/${props.name.replace(" ", "-")}/${contestNumber}`
              )
            }
            size="sm"
            border="none"
            outline={"none"}
            transition={`all`}
            boxShadow={`3px 3px 12px ${theme.bgColor}`}
            bg={"#F2CD5C"}
            transitionDuration={"200ms"}
            transitionTimingFunction="ease-in-out"
            width={"36"}
            _hover={{
              bg: "#F2921D",
            }}
            color="black"
          >
            Leaderboard
          </Button>
        ) : null}
      </Box>
    </Box>
  );
};

export default TimerButtonForSpecialGame;
