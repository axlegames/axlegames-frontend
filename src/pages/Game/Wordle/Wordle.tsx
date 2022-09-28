import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, useToast } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

import Grid from "./components/Grid";
import Navbar from "./components/Navbar";
import KeyBoard from "./components/Keyboard";

import WonModal from "./modals/WonModal";
import LostModal from "./modals/LostModal";
import MenuModal from "./modals/MenuModal";
import HowToPlayModal from "./modals/HowToPlayModal";

import { WordleServices } from "./WordleServices";
import { KEY_ACTION, initState, reducer, WordleState } from "./WordleReducer";

const Wordle = () => {
  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [start, setStart] = useState(true);

  const toast = useToast();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initState);

  const { contestId, gameStateId, game } = useParams();

  const initStateFromServer = () => {
    WordleServices.getGameState({
      userId: localStorage.getItem("userId"),
    })
      .then((game) => {
        if (game.isGameCompeted) {
          if (game.isWinningWord) setIsWon(true);
          else setIsLost(true);
        }

        if (game.wordList.length > 0) {
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
          return setStart(false);
        }

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
          completedRows: WordleServices.initRows(game.guessLength),
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
        return setStart(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    return () => {
      setStart(true);
      setIsWon(false);
      setIsLost(false);
    };
  }, []);

  const onKeyPress = (key: string) => {
    return dispatch({
      type: KEY_ACTION.ON_KEY_PRESS,
      payload: {
        key: key,
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
    const { guessStatus, inValidWord, isWinningWord } =
      await WordleServices.validateUpdateGuess({
        word: state.currentGuess,
        contestId: contestId,
        gameStateId: gameStateId,
      });
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
        if (isWinningWord) setIsWon(true);
        else setIsLost(true);
      }, 1500);
    }
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
      <MenuModal
        title={"How To Play?"}
        isOpen={start}
        children={<HowToPlayModal game={game} />}
        close={() => initStateFromServer()}
      />
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
