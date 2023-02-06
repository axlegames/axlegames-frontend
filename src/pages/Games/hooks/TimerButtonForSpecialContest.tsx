import { Box, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
}

const TimerButtonForSpecialContest = (props: Props) => {
  const [isLive, setIsLive] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const calcualteRemainingTime = () => {
    const remainingTimeToStart =
      new Date(props.startsIn).getTime() - new Date().getTime();
    const _isStarted = remainingTimeToStart < 0 ? true : false;
    setIsStarted(_isStarted);

    const remainingTimeForLive =
      new Date(props.opensAt).getTime() - new Date().getTime();
    const _isLive = remainingTimeForLive < 0 ? true : false;
    setIsLive(_isLive);

    // const remainingTimeForLive =
    //   new Date(props.opensAt).getTime() - new Date().getTime();
    // const _isLive = remainingTimeForLive < 0 ? true : false;
    // setIsLive(_isLive);

    const time = Date.parse(props.startsIn) - new Date().getTime();
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

  const CurrentButtonStatus = () => {
    if (!isStarted) {
      return (
        <Button size="sm" width={"36"} color="black" bg="orange">
          {" "}
          {!isLoaded ? `Loading...` : `opens in ${minutes}m ${seconds}s`}
        </Button>
      );
    }
    if (isStarted && !isLive) {
      return (
        <Button
          color="black"
          bg="green.500"
          onClick={() => props.action()}
          size="sm"
          width={"36"}
        >
          {!isLoaded ? `Loading...` : "Play"}
        </Button>
      );
    }

    if (isStarted && isLive) {
      return (
        <Button disabled size="sm" width={"36"} color="black">
          {!isLoaded ? `Loading...` : "Entry Closed"}
        </Button>
      );
    }
  };

  const navigate = useNavigate();

  return (
    <Box>
      <Box>{CurrentButtonStatus()}</Box>
      <Box mt={2}>
        {isStarted && isLive ? (
          <Button
            onClick={() =>
              navigate(
                `/leaderboard/${props.name.replace(" ", "-")}/${
                  props.contestId
                }`
              )
            }
            size="sm"
            width={"36"}
            color="black"
            bg="orange"
          >
            Leaderboard
          </Button>
        ) : null}
      </Box>
    </Box>
  );
};

export default TimerButtonForSpecialContest;
