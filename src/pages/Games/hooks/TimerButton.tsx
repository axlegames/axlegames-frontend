import { Box, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { theme } from "../../../config/theme.config";
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
  contestName: string;
}

const TimerButton = (props: Props) => {
  const [isLive, setIsLive] = useState(false);
  const [isStartsIn, setIsStartsIn] = useState(false);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const isPracticeContest =
    props.gameType === GameType.PRACTICE.valueOf().toString();

  useEffect(() => {
    const calcualteRemainingTime = () => {
      const remainingTimeForLive =
        new Date(props.deadline).getTime() -
        new Date(props.currentTime).getTime();

      const remainingTimeForStartsIn =
        new Date(props.startsIn).getTime() -
        new Date(props.currentTime).getTime();

      const _isStartsIn =
        remainingTimeForStartsIn > 0 &&
        remainingTimeForStartsIn < 10 * 60 * 1000
          ? true
          : false;

      const _isLive = remainingTimeForLive > 0 ? true : false;

      setIsStartsIn(_isStartsIn);
      setIsLive(_isLive);

      const time =
        Date.parse(props.startsIn) - new Date(props.currentTime).getTime();
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    };
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    const interval = setInterval(() => calcualteRemainingTime(), 1000);
    return () => clearInterval(interval);
  }, [props]);

  const CurrentButtonStatus = () => {
    if (
      (props.status.toString() === GameStatus.LOBBY &&
        props.gameType === "CONTEST") ||
      isPracticeContest
    ) {
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
    if (isStartsIn) {
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
          {!isLoaded ? `Loading...` : `opens in ${minutes}m ${seconds}s`}
        </Button>
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
  };

  const navigate = useNavigate();
  const iscontest = props.gameType === "CONTEST";

  return (
    <Box>
      <Box>{CurrentButtonStatus()}</Box>
      <Box mt={2}>
        {iscontest && props.status === GameStatus.LIVE ? (
          <Button
            onClick={() =>
              navigate(
                `/leaderboard/${props.name.replace(" ", "-")}/${
                  props.contestId
                }`
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

export default TimerButton;
