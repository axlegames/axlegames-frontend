import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, useToast } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

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
} from "../../GameServices";
import {
  KEY_ACTION,
  initState,
  aiWordleReducer,
  WordleState,
} from "./AIWordleReducer";

import WordleTimer from "../../hooks/WordleTimer";
import { TokenAuthStatus } from "../../../../config/auth";

import AIWordleGrid from "./components/AIWordleGrid";
import NeuButton from "../../../Axle/component/NeuButton";

const AIWordle = () => {
  const toast = useToast();

  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);

  const navigate = useNavigate();

  const { contestId, gameStateId, isContest } = useParams();
  const game = "aiwordle";

  const [state, dispatch] = useReducer(aiWordleReducer, initState);
  const [time, setTime] = useState<string>(new Date(Date.now()).toString());
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
    return () => {
      setIsWon(false);
      setIsLost(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    GameServices.getLobbyStats(contestId || "")

      .then((res) => {
        // isAuthorized(res as TokenAuthStatus);
        const r = res as LobbyInterface;
        const contestInfo = r.contest.axleContestInfo;
        const opensAt = new Date(contestInfo.opensAt).getTime();
        const time = new Date(Date.now()).getTime();
        const isOpened = opensAt - time < 0 ? true : false;
        if (!isOpened)
          return navigate(`/${game}/lobby/${contestId}/${gameStateId}`);
        setTime(
          r.contest.axleContestInfo?.expiresAt ||
            new Date(Date.now()).toString()
        );
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contestId]);

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
    if (state.currentGuess.length < state.wordlength) {
      return toast({
        title: "Not enough letters",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
    const resp = await GameServices.validateUpdateGuess({
      word: state.currentGuess.toLowerCase(),
      contestId: contestId,
      gameStateId: gameStateId,
    });
    isAuthorized(resp as TokenAuthStatus);
    const { guessStatus, inValidWord, isWinningWord } = resp as GuessStatus;

    if (inValidWord) {
      return toast({
        title: "Invalid Word",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }

    const wordLength = state.wordlength;
    const gameState = state.gameState;
    const emptyRow = GameServices.generateEmptyRows(wordLength);
    gameState.push(emptyRow);

    const currentGuessStatus = guessStatus || [];

    const gameStatus = state.gameStatus;
    const len = gameStatus[gameStatus.length - 1].length;
    if (len === 0) {
      gameStatus.push(currentGuessStatus);
    } else {
      gameStatus.push([]);
    }

    dispatch({
      type: KEY_ACTION.ON_ENTER,
      payload: {
        key: "",
        guessesStatus: currentGuessStatus,
        guessLength: gameState.length + 1,
        gameState: gameState,
        gameStatus: gameStatus,
        game: "AI_WORDLE",
      },
    });
    window.scrollTo(0, document.body.scrollHeight);
    if (isWinningWord) {
      await GameServices.cleanGameState({
        userId: localStorage.getItem("userId"),
      });
      setTimeout(() => {
        if (isWinningWord) {
          setIsWon(true);
          GameServices.saveGame(
            localStorage.getItem("userId") ?? "",
            contestId ?? "",
            state.currentRow + 1,
            true
          )
            .then((r) => console.log(r))
            .catch((e) => console.log(e));
        } else {
          setIsLost(true);
          GameServices.saveGame(
            localStorage.getItem("userId") ?? "",
            contestId ?? "",
            state.currentRow + 1,
            false
          )
            .then((r) => console.log(r))
            .catch((e) => console.log(e));
        }
      }, 1500);
    }
  };

  const forceFinishGame = async () => {
    const resp = await GameServices.validateUpdateGuess({
      word: state.currentGuess.toLowerCase(),
      contestId: contestId,
      gameStateId: gameStateId,
    });
    isAuthorized(resp as TokenAuthStatus);
    const { isWinningWord } = resp as GuessStatus;
    await GameServices.cleanGameState({
      userId: localStorage.getItem("userId"),
    });
    setTimeout(() => {
      if (isWinningWord) {
        setIsWon(true);
        GameServices.saveGame(
          localStorage.getItem("userId") ?? "",
          contestId ?? "",
          state.currentRow + 1,
          true
        )
          .then((r) => console.log(r))
          .catch((e) => console.log(e));
      } else {
        setIsLost(true);
        GameServices.saveGame(
          localStorage.getItem("userId") ?? "",
          contestId ?? "",
          state.currentRow + 1,
          false
        )
          .then((r) => console.log(r))
          .catch((e) => console.log(e));
      }
    }, 1500);
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

  const Timer = () => {
    if (isContest === "true") {
      return isLoaded ? (
        <WordleTimer
          isLoaded={isLoaded}
          endgame={() => forceFinishGame()}
          deadline={time}
          currentTime={0}
        />
      ) : null;
    }
    return null;
  };

  return (
    <Box>
      <Navbar title={game} />
      <Timer />
      <MenuModal
        title={"Hooray!"}
        isOpen={isWon}
        children={<WonModal />}
        close={() => navigate("/")}
      />
      <MenuModal
        title={"Oh oh!"}
        isOpen={isLost}
        children={<LostModal />}
        close={() => navigate("/")}
      />
      <Box
        display={"flex"}
        justifyContent="center"
        flexDirection={"column"}
        bg={theme.bgColor}
        rowGap="1rem"
        minH="90vh"
      >
        <AIWordleGrid
          gameStatus={state.gameStatus}
          completedRows={state.completedRows}
          game={state.gameState}
        />
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
        <KeyBoard
          onDelete={onDelete}
          onEnter={onEnter}
          onKeyPress={onKeyPress}
        />
      </Box>
    </Box>
  );
};

export default AIWordle;
