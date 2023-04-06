import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, useToast } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

import Grid from "../../components/Grid";
import Navbar from "../../components/Navbar";
import KeyBoard from "../../components/Keyboard";

import WonModal from "../../modals/WonModal";
import LostModal from "../../modals/LostModal";
import MenuModal from "../../modals/MenuModal";

import {
  GameServices,
  Status,
  GuessStatus,
  LobbyInterface,
  PlayerStats,
} from "../../GameServices";
import {
  KEY_ACTION,
  initState,
  wordleReducer,
  WordleState,
} from "./WordleReducer";

import WordleTimer from "../../hooks/WordleTimer";
import { TokenAuthStatus } from "../../../../config/auth";
import NeuButton from "../../../Axle/component/NeuButton";

interface Props {
  isLoaded: boolean;
  currentTime: number;
  forceFinishGame: Function;
  deadline: string;
}

const Timer = (props: Props) => {
  return props.isLoaded ? (
    <WordleTimer
      isLoaded={props.isLoaded}
      currentTime={props.currentTime}
      endgame={() => props.forceFinishGame()}
      deadline={props.deadline.toString()}
    />
  ) : null;
};

const Wordle = () => {
  const toast = useToast();

  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);

  const navigate = useNavigate();

  const { contestId, gameStateId, game, isContest } = useParams();

  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const [state, dispatch] = useReducer(wordleReducer, initState);
  const [deadLine, setDeadLine] = useState<string>(new Date().toString());
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [stats, setStats] = useState<PlayerStats>({
    currentStreak: 0,
    maxStreak: 0,
    played: 0,
    winPercent: 0,
  });

  const fectchState = (game: Status) => {
    dispatch({
      type: KEY_ACTION.ON_FETCH,
      payload: {
        guessesStatus: [],
        key: "",
        gameState: game.wordList,
        gameStatus: game.gameStatus,
        guessLength: game.guessLength,
        wordLength: game.wordLength,
      },
    });
  };

  const initializeState = (game: Status) => {
    const completedRows = GameServices.initRows(game.guessLength);
    const initState: WordleState = {
      guessLength: game.guessLength,
      wordlength: game.wordLength,
      gameState: GameServices.createInitState(
        game.guessLength,
        game.wordLength
      ),
      gameStatus: GameServices.createInitState(
        game.guessLength,
        game.wordLength
      ),
      completedRows: completedRows,
      currentGuess: "",
      currentRow: 0,
    };

    dispatch({
      type: KEY_ACTION.ON_INIT,
      payload: {
        guessesStatus: [],
        key: "",
        gameState: [],
        gameStatus: [],
        currentState: initState,
      },
    });
  };

  useEffect(() => {
    const isAuthorized = (status: TokenAuthStatus) => {
      if (
        status.valueOf().toString() ===
        TokenAuthStatus.UNAUTHORIZED.valueOf().toString()
      ) {
        localStorage.clear();
        navigate("/");
        return window.location.reload();
      }
    };
    GameServices.getGameState({ userId: localStorage.getItem("userId") })
      .then((game) => {
        isAuthorized(game as TokenAuthStatus);
        game = game as Status;
        if (game.isGameCompeted)
          if (game.isWinningWord) setIsWon(true);
          else setIsLost(true);

        if (game.wordList.length > 0) fectchState(game);
        else initializeState(game);
      })
      .catch((err) => console.log(err));

    GameServices.getPlayerStats(contestId || "").then((resp) => {
      setStats(resp);
    });

    return () => {
      setIsWon(false);
      setIsLost(false);
    };
  }, [contestId, navigate]);

  useEffect(() => {
    const isAuthorized = (status: TokenAuthStatus) => {
      if (
        status.valueOf().toString() ===
        TokenAuthStatus.UNAUTHORIZED.valueOf().toString()
      ) {
        localStorage.clear();
        navigate("/");
        return window.location.reload();
      }
    };

    GameServices.getLobbyStats(contestId || "")
      .then((res) => {
        isAuthorized(res as TokenAuthStatus);
        const r = res as LobbyInterface;
        const contestInfo = r.contest.axleContestInfo;
        const opensAt = new Date(contestInfo.opensAt).getTime();
        const time = new Date(r.currentTime).getTime();
        setCurrentTime(new Date(r.currentTime).getTime());
        const isOpened = opensAt - time < 0 ? true : false;
        if (!isOpened)
          return navigate(`/${game}/lobby/${contestId}/${gameStateId}`);
        setDeadLine(
          r.contest.axleContestInfo?.expiresAt || new Date().toString()
        );
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [contestId, game, gameStateId, navigate]);

  const onKeyPress = (key: string) => {
    return dispatch({
      type: KEY_ACTION.ON_KEY_PRESS,
      payload: {
        key: key.toUpperCase(),
        guessesStatus: [],
        gameState: state.gameState,
        gameStatus: state.gameStatus,
      },
    });
  };

  const onEnter = async () => {
    const isAuthorized = (status: TokenAuthStatus) => {
      if (
        status.valueOf().toString() ===
        TokenAuthStatus.UNAUTHORIZED.valueOf().toString()
      ) {
        localStorage.clear();
        navigate("/");
        return window.location.reload();
      }
    };

    if (state.currentGuess.length < state.wordlength) {
      return toast({
        title: "Not enough letters",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
    const resp = await GameServices.validateUpdateGuess(
      {
        word: state.currentGuess.toLowerCase(),
        contestId: contestId,
        gameStateId: gameStateId,
      },
      false
    );
    isAuthorized(resp as TokenAuthStatus);
    const { guessStatus, inValidWord, isWinningWord } = resp as GuessStatus;
    console.log(resp);
    if (inValidWord) {
      return toast({
        title: "Invalid Word",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
    dispatch({
      type: KEY_ACTION.ON_ENTER,
      payload: {
        key: "",
        guessesStatus: guessStatus || [],
        gameState: state.gameState,
        gameStatus: state.gameStatus,
      },
    });
    if (state.currentRow === state.guessLength - 1 || isWinningWord) {
      await GameServices.cleanGameState({
        userId: localStorage.getItem("userId"),
      });
      setTimeout(() => {
        if (isWinningWord) {
          GameServices.saveGame(
            localStorage.getItem("userId") ?? "",
            contestId ?? "",
            state.currentRow + 1,
            true
          )
            .then((r) => {
              getStats();
              setIsWon(true);
            })
            .catch((e) => console.log(e));
        } else {
          GameServices.saveGame(
            localStorage.getItem("userId") ?? "",
            contestId ?? "",
            state.currentRow + 1,
            false
          )
            .then((r) => {
              console.log("cry");
              console.log(r);
              getStats();
              setIsLost(true);
            })
            .catch((e) => console.log(e));
        }
      }, 1500);
    }
  };

  const forceFinishGame = async () => {
    const isAuthorized = (status: TokenAuthStatus) => {
      if (
        status.valueOf().toString() ===
        TokenAuthStatus.UNAUTHORIZED.valueOf().toString()
      ) {
        localStorage.clear();
        navigate("/");
        return window.location.reload();
      }
    };
    const resp = await GameServices.validateUpdateGuess(
      {
        word: state.currentGuess.toLowerCase(),
        contestId: contestId,
        gameStateId: gameStateId,
      },
      false
    );
    isAuthorized(resp as TokenAuthStatus);
    const { isWinningWord } = resp as GuessStatus;
    await GameServices.cleanGameState({
      userId: localStorage.getItem("userId"),
    });
    setTimeout(() => {
      if (isWinningWord) {
        GameServices.saveGame(
          localStorage.getItem("userId") ?? "",
          contestId ?? "",
          state.currentRow + 1,
          true
        )
          .then((r) => {
            getStats();
            setIsWon(true);
          })
          .catch((e) => console.log(e));
      } else {
        GameServices.saveGame(
          localStorage.getItem("userId") ?? "",
          contestId ?? "",
          state.currentRow + 1,
          false
        )
          .then((r) => {
            getStats();
            setIsLost(true);
          })
          .catch((e) => console.log(e));
      }
    }, 1500);
  };

  const getStats = () => {
    GameServices.getPlayerStats(contestId || "").then((resp) => {
      setStats(resp);
    });
  };

  const shareResult = () => {
    let result: string = `I guessed this ${state.wordlength}-letter word in ${
      state.currentRow
    }/5 tries.
    \ncontest  : ${contestId}.
    \nusername : ${localStorage.getItem("username") || ""}.\n
    `;

    for (let i = 0; i < state.gameStatus.length; i++) {
      const word = state.gameStatus[i];
      for (let j = 0; j < word.length; j++) {
        if (word[j] === "present") result += String("🟨 ");
        if (word[j] === "absent") result += String("⬜ ");
        if (word[j] === "correct") result += String("🟩 ");
      }
      result += "\n";
    }
    navigator.clipboard.writeText(result);
    return toast({
      title: "Copied",
      description: "Result copied to clipboard",
      status: "success",
      duration: 4000,
      isClosable: true,
      position: "top",
    });
  };

  const onDelete = () =>
    dispatch({
      type: KEY_ACTION.ON_DELETE,
      payload: {
        key: "",
        guessesStatus: [],
        gameState: state.gameState,
        gameStatus: state.gameStatus,
      },
    });

  return (
    <Box>
      <MenuModal
        title={"Hooray!"}
        isOpen={isWon}
        children={
          <WonModal
            result={state.gameStatus}
            stats={stats}
            shareResult={shareResult}
          />
        }
        close={() => navigate("/")}
      />
      <MenuModal
        title={"Oh oh!"}
        isOpen={isLost}
        children={<LostModal stats={stats} shareResult={shareResult} />}
        close={() => navigate("/")}
      />
      <Navbar username={localStorage.getItem("username")} title={game} />
      {isContest === "true" ? (
        <Timer
          currentTime={currentTime}
          deadline={deadLine}
          forceFinishGame={() => forceFinishGame()}
          isLoaded={isLoaded}
        />
      ) : null}

      <Box
        display={"flex"}
        flexDirection={"column"}
        bg={theme.bgColor}
        rowGap="1rem"
        minH="90vh"
        justifyContent="center"
      >
        <Grid
          gameStatus={state.gameStatus}
          completedRows={state.completedRows}
          game={state.gameState}
        />
        <KeyBoard
          onDelete={onDelete}
          onEnter={onEnter}
          onKeyPress={onKeyPress}
        />

        <Box
          mx={8}
          display={"flex"}
          justifyContent="flex-end"
          alignItems={"center"}
        >
          {isContest === "false" ? (
            <Box
              bg={theme.bgColor}
              p={4}
              justifyContent="center"
              display={"flex"}
            >
              <NeuButton
                bg={theme.neuPrimaryBg}
                label="End Game"
                shadow={theme.newPrimaryShadow}
                onClick={() => forceFinishGame()}
              />
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Wordle;
