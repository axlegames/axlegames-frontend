import { Box, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { GameType } from "../../Home/enums/contests.enum";

interface Props {
  deadline: string;
  startsIn: string;
  action: Function;
  gameType: string;
}

const TimerButton = (props: Props) => {
  const [expired, setExpired] = useState(false);
  const [started, setStarted] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const isPracticeContest =
    props.gameType === GameType.PRACTICE.valueOf().toString();

  const isExpired = () => {
    const diff = new Date(props.startsIn).getTime() - new Date().getTime();
    const isExp = new Date(props.deadline).getTime() - new Date().getTime();

    const exp = isExp < 0 ? true : false;
    const started = diff < 0 ? true : false;

    setExpired(exp);
    setStarted(started);

    const time = Date.parse(props.startsIn) - new Date().getTime();
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => isExpired(), 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {expired && started ? (
        <Button disabled size="sm" width={"32"} color="black">
          Expired
        </Button>
      ) : null}

      {(started && !expired) || isPracticeContest ? (
        <Button
          bg="green.500"
          onClick={() => props.action()}
          size="sm"
          width={"32"}
        >
          Play
        </Button>
      ) : !expired ? (
        <Button size="sm" width={"32"} color="black">
          Starts in {`${minutes}m ${seconds}s`}
        </Button>
      ) : null}
    </Box>
  );
};

export default TimerButton;
