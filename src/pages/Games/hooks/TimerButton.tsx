import { Box, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { GameType } from "../../Home/enums/contests.enum";

interface Props {
  deadline: string;
  startsIn: string;
  opensAt: string;
  action: Function;
  gameType: string;
}

const TimerButton = (props: Props) => {
  const [expired, setExpired] = useState(false);
  const [started, setStarted] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEntryClosed, setIsEntryClosed] = useState(false);

  const isPracticeContest =
    props.gameType === GameType.PRACTICE.valueOf().toString();

  const isExpired = () => {
    const diff = new Date(props.startsIn).getTime() - new Date().getTime();
    const isExp = new Date(props.deadline).getTime() - new Date().getTime();
    const entry = new Date(props.opensAt).getTime() - new Date().getTime();

    const exp = isExp < 0 ? true : false;
    const started = diff < 0 ? true : false;
    const isEntryClosed = entry < 0 ? true : false;

    setExpired(exp);
    setStarted(started);
    setIsEntryClosed(isEntryClosed);

    const time = Date.parse(props.startsIn) - new Date().getTime();
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    const interval = setInterval(() => isExpired(), 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {expired && started ? (
        <Button disabled size="sm" width={"32"} color="black">
          {!isLoaded ? `Loading...` : "Expired"}
        </Button>
      ) : null}
      {isEntryClosed && !expired ? (
        <Button color="black" disabled size="sm" width={"32"}>
          {!isLoaded ? `Loading...` : "Entry Closed"}
        </Button>
      ) : (
        <Box>
          {(started && !expired) || isPracticeContest ? (
            <Button
              color="black"
              bg="green.500"
              onClick={() => props.action()}
              size="sm"
              width={"32"}
            >
              {!isLoaded ? `Loading...` : "Play"}
            </Button>
          ) : !expired ? (
            <Button size="sm" color={"black"} bg={"orange.400"} width={"32"}>
              {!isLoaded ? `Loading...` : `Starts in ${minutes}m ${seconds}s`}
            </Button>
          ) : null}
        </Box>
      )}
    </Box>
  );
};

export default TimerButton;
