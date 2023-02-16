import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { theme } from "../../../../config/theme.config";
import { LobbyInterface } from "../../GameServices";

interface Props {
  lobby?: LobbyInterface;
  params: any;
  isLoaded: boolean;
  navigate: Function;
}

const WordleLobbyTimer = (props: Props) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [currentTime, setCurrentTime] = useState(
    new Date(props.lobby?.currentTime || Date.now()).getTime()
  );

  useEffect(() => {
    const getTime = () => {
      const time =
        Date.parse(props.lobby?.contest.axleContestInfo.opensAt || "") -
        currentTime;
      const _currentTime = currentTime + 1000;
      setCurrentTime(_currentTime);
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
      if (time < 0) {
        return props.navigate(
          `/${props.params.game}/${props.params.contestId}/${
            props.params.gameStateId
          }/${true}`
        );
      }
    };
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, [currentTime, props]);

  return (
    <Box>
      <Box
        fontSize={"4xl"}
        color={theme.secondaryTextColor}
        display={"flex"}
        columnGap="1rem"
        fontFamily={"'Russo One', sans-serif"}
      >
        <Box
          minW="32"
          maxW={"32"}
          p={4}
          backgroundImage={`radial-gradient(circle, #1442b5, #003b96, #003376, #002956, #061e37)`}
          borderRadius="md"
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
        >
          {minutes === 0 ? minutes : "0" + minutes.toString()}m
        </Box>
        <Box
          minW="32"
          maxW={"32"}
          p={4}
          backgroundImage={`radial-gradient(circle, #1442b5, #003b96, #003376, #002956, #061e37)`}
          borderRadius="md"
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
        >
          {seconds.toString().length === 0 ? "0" + seconds.toString() : seconds}
          s
        </Box>
      </Box>
    </Box>
  );
};

export default WordleLobbyTimer;
