import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, useToast } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";

import Grid from "./components/Grid";
import Navbar from "./components/Navbar";
import KeyBoard from "./components/Keyboard";

import WonModal from "./modals/WonModal";
import LostModal from "./modals/LostModal";
import MenuModal from "./modals/MenuModal";

import { WordleServices, Status, GuessStatus } from "./WordleServices";
import { KEY_ACTION, initState, reducer, WordleState } from "./WordleReducer";

import WordleTimer from "./hooks/WordleTimer";
import { Contest } from "./WordleServices";
import { TokenAuthStatus } from "../../config/auth";

const Wordle = () => {
  const toast = useToast();

  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);

  const navigate = useNavigate();

  const { contestId, gameStateId, game } = useParams();

  const [state, dispatch] = useReducer(reducer, initState);
  const [contest, setContest] = useState<Contest>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const isAuthorized = (status: TokenAuthStatus) => {
    if (
      status.valueOf().toString() ===
      TokenAuthStatus.UNAUTHORIZED.valueOf().toString()
    ) {
      localStorage.clear();
      return navigate("/");
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
    const completedRows = WordleServices.initRows(game.guessLength);
    const initState: WordleState = {
      guessLength: game.guessLength,
      wordlength: game.wordLength,
      gameState: WordleServices.createInitState(
        game.guessLength,
        game.wordLength
      ),
      gameStatus: WordleServices.createInitState(
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
    WordleServices.getGameState({ userId: localStorage.getItem("userId") })
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
    WordleServices.getLobbyStats(contestId || "")
      .then((res) => {
        isAuthorized(res as TokenAuthStatus);
        setContest(res as Contest);
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
    const resp = await WordleServices.validateUpdateGuess({
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
      await WordleServices.cleanGameState({
        userId: localStorage.getItem("userId"),
      });
      setTimeout(() => {
        if (isWinningWord) {
          setIsWon(true);
          WordleServices.saveGame(
            localStorage.getItem("userId") ?? "",
            contestId ?? "",
            state.currentRow + 1,
            true
          )
            .then((r) => console.log(r))
            .catch((e) => console.log(e));
        } else {
          setIsLost(true);
          WordleServices.saveGame(
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
    const resp = await WordleServices.validateUpdateGuess({
      word: state.currentGuess.toLowerCase(),
      contestId: contestId,
      gameStateId: gameStateId,
    });
    isAuthorized(resp as TokenAuthStatus);
    const { isWinningWord } = resp as GuessStatus;
    await WordleServices.cleanGameState({
      userId: localStorage.getItem("userId"),
    });
    setTimeout(() => {
      if (isWinningWord) {
        setIsWon(true);
        WordleServices.saveGame(
          localStorage.getItem("userId") ?? "",
          contestId ?? "",
          state.currentRow + 1,
          true
        )
          .then((r) => console.log(r))
          .catch((e) => console.log(e));
      } else {
        setIsLost(true);
        WordleServices.saveGame(
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

  return (
    <Box>
      <Navbar title={game} />
      <Box>
        {isLoaded ? (
          <WordleTimer
            isLoaded={isLoaded}
            endgame={() => forceFinishGame()}
            deadline={contest?.axleContestInfo.expiresAt || ""}
          />
        ) : null}
      </Box>
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
        alignItems="center"
        bg={theme.bgColor}
        rowGap="3rem"
        maxH={"100vh"}
        minH="100vh"
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
      </Box>
    </Box>
  );
};

export default Wordle;
