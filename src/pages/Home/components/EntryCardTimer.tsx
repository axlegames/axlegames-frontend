import { Box } from "@chakra-ui/react";
import { GameType } from "../enums/contests.enum";
import Timer from "../../Games/hooks/Timer";

interface TimerProps {
  gameType: GameType;
  currentTime: string;
  opensAt: string;
  expiresAt: string;
  startsOn: string;
}

const EntryCardTimer = (props: TimerProps) => {
  const toStringGameType = (gameType: GameType) => {
    return gameType.valueOf().toString();
  };
  const gameType = props.gameType.valueOf().toString();
  const type =
    gameType === toStringGameType(GameType.PRACTICE) ||
    gameType === toStringGameType(GameType.GAMIN_NIGHTS);

  return !type || gameType === toStringGameType(GameType.GAMIN_NIGHTS) ? (
    <Box>
      <Timer
        currentTime={props.currentTime}
        opensAt={props.opensAt || ""}
        deadline={props.expiresAt || ""}
        startsOn={props.startsOn || ""}
      />
    </Box>
  ) : null;
};

export default EntryCardTimer;
