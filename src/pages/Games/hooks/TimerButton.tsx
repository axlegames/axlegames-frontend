import { Box, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { GameStatus, GameType } from "../../Home/enums/contests.enum";

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

const TimerButton = (props: Props) => {
  const [isLive, setIsLive] = useState(false);
  const [isStartsIn, setIsStartsIn] = useState(false);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const isPracticeContest =
    props.gameType === GameType.PRACTICE.valueOf().toString();

  const calcualteRemainingTime = () => {
    const remainingTimeForLive =
      new Date(props.deadline).getTime() - new Date().getTime();

    const remainingTimeForStartsIn =
      new Date(props.startsIn).getTime() - new Date().getTime();

    if (isGaminContest) {
      console.log(remainingTimeForLive / 1000);
    }

    const _isStartsIn =
      remainingTimeForStartsIn > 0 && remainingTimeForStartsIn < 10 * 60 * 1000
        ? true
        : false;

    const _isLive = remainingTimeForLive > 0 ? true : false;

    setIsStartsIn(_isStartsIn);
    setIsLive(_isLive);

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
    if (
      (props.status.toString() === GameStatus.LOBBY &&
        props.gameType === "CONTEST") ||
      isPracticeContest
    ) {
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
    if (isStartsIn) {
      return (
        <Button size="sm" width={"36"} color="black" bg="orange">
          {" "}
          {!isLoaded ? `Loading...` : `opens in ${minutes}m ${seconds}s`}
        </Button>
      );
    }
    if (isGaminContest) {
      return (
        <Box>
          {isLive ? (
            <Button
              color="black"
              bg="green.500"
              onClick={() => props.action()}
              size="sm"
              width={"36"}
            >
              {!isLoaded ? `Loading...` : "Play"}
            </Button>
          ) : (
            <Button disabled size="sm" width={"36"} color="black">
              {!isLoaded ? `Loading...` : "Entry Closed"}
            </Button>
          )}
        </Box>
      );
    }
    if (isLive) {
      return (
        <Button disabled size="sm" width={"36"} color="black">
          {" "}
          {!isLoaded ? `Loading...` : "Entry Closed"}{" "}
        </Button>
      );
    }
    if (!isLive && !isStartsIn && isGaminContest) {
      return (
        <Button disabled size="sm" width={"36"} color="black">
          {" "}
          {!isLoaded ? `Loading...` : "Entry Closed"}{" "}
        </Button>
      );
    }
  };

  const navigate = useNavigate();
  const iscontest = props.gameType === "CONTEST";
  const isGaminContest = props.gameType === "GAMIN_NIGHTS";

  return (
    <Box>
      <Box>{CurrentButtonStatus()}</Box>
      <Box mt={2}>
        {(iscontest && props.status === GameStatus.LIVE) ||
        (isGaminContest && !isStartsIn && !isLive) ? (
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

export default TimerButton;
