import { Box, useToast } from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import { theme } from "../../../config/theme.config";
import Grid from "./components/Grid";
import KeyBoard from "./components/Keyboard";
import Navbar from "./components/Navbar";
import LostModal from "./modals/LostModal";
import MenuModal from "./modals/MenuModal";
import WonModal from "./modals/WonModal";
import { KEY_ACTION, initState, reducer } from "./WordleReducer";
import { WordleServices } from "./WordleServices";

const Wordle = () => {
  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);

  const toast = useToast();
  const [state, dispatch] = useReducer(reducer, initState);

  const { contestId, gameStateId } = useParams();

  useEffect(() => {
    WordleServices.getGameState({
      userId: localStorage.getItem("userId"),
    })
      .then((game) => {
        if (game.hasGameState) {
          return dispatch({
            type: KEY_ACTION.ON_INIT,
            payload: {
              guessesStatus: [],
              key: "",
              gameState: game.wordList,
              gameStatus: game.gameStatus,
            },
          });
        }
      })
      .catch((err) => console.log(err));
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
    if (state.currentGuess.length < 5) {
      return toast({
        title: "Not enough letters",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
    let data = {
      word: state.currentGuess,
      contestId: contestId,
      gameStateId: gameStateId,
    };
    const { guessStatus, inValidWord, isWinningWord } =
      await WordleServices.validateUpdateGuess(data);
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
    console.log(isWinningWord);

    if (state.currentRow === 4 || isWinningWord) {
      WordleServices.cleanGameState({
        userId: localStorage.getItem("userId"),
      }).then((resp) => {
        setTimeout(() => {
          if (isWinningWord) {
            setIsWon(true);
          } else {
            setIsLost(true);
          }
        }, 1500);
      });
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
      <Navbar />
      <MenuModal
        isOpen={isWon}
        children={<WonModal />}
        close={() => setIsWon(false)}
      />
      <MenuModal
        isOpen={isLost}
        children={<LostModal />}
        close={() => setIsLost(false)}
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
