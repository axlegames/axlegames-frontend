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

import { GameServices, Status, GuessStatus } from "../../GameServices";
import {
  KEY_ACTION,
  initState,
  wordleReducer,
  WordleState,
} from "./GuestWordleReducer";

import NeuButton from "../../../Axle/component/NeuButton";

const GuestWordle = () => {
  const toast = useToast();

  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);

  const navigate = useNavigate();

  const { contestId, gameStateId, game } = useParams();

  const [state, dispatch] = useReducer(wordleReducer, initState);

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
    GameServices.getGuestGameState({
      gameStateId: gameStateId,
      contestId: contestId,
    })
      .then((game) => {
        game = game as Status;
        if (game.hasPlayingAnotherGame) {
          toast({
            description: `Oops, You are already playing ${game.name}`,
            title: "Already In Game",
            status: "warning",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
          setTimeout(() => {
            return navigate("/");
          }, 4000);
        }
        if (game.isGameCompeted) {
          if (game.isWinningWord) setIsWon(true);
          else setIsLost(true);
        }
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
    const resp = await GameServices.validateUpdateGuestGuess({
      word: state.currentGuess.toLowerCase(),
      contestId: contestId,
      gameStateId: gameStateId,
    });
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
      await GameServices.cleanGuestGameState({
        gameStateId: gameStateId || "",
      });
      setTimeout(() => {
        if (isWinningWord) setIsWon(true);
        else setIsLost(true);
      }, 1500);
    }
  };

  const forceFinishGame = async () => {
    const resp = await GameServices.validateUpdateGuess(
      {
        word: state.currentGuess.toLowerCase(),
        contestId: contestId,
        gameStateId: gameStateId,
      },
      false
    );
    const { isWinningWord } = resp as GuessStatus;
    await GameServices.cleanGuestGameState({
      gameStateId: gameStateId || "",
    });
    setTimeout(() => {
      if (isWinningWord) setIsWon(true);
      else setIsLost(true);
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

  const shareResult = () => {
    let result: string = `I guessed this ${state.wordlength}-letter word in ${
      state.currentRow
    }/5 tries.\ncontest  : ${contestId}.\nusername : ${
      localStorage.getItem("guestname") || ""
    }.\n
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

  return (
    <Box>
      <MenuModal
        title={"Hooray!"}
        isOpen={isWon}
        children={
          <WonModal
            isPractice={true}
            isAIWordle={false}
            letter={state.wordlength}
            tries={state.currentRow}
            isGuest={true}
            result={state.gameStatus}
            stats={{
              currentStreak: 0,
              maxStreak: 0,
              played: 0,
              winPercent: 0,
            }}
            shareResult={shareResult}
          />
        }
        close={() => navigate("/")}
      />
      <MenuModal
        title={"Oh oh!"}
        isOpen={isLost}
        children={
          <LostModal
            isPractice={true}
            isGuest={true}
            stats={{
              currentStreak: 0,
              maxStreak: 0,
              played: 0,
              winPercent: 0,
            }}
            shareResult={shareResult}
          />
        }
        close={() => navigate("/")}
      />
      <Navbar username={localStorage.getItem("guestname")} title={`${game}`} />

      <Box bg={theme.bgColor} p={8} display={"flex"} justifyContent="flex-end">
        <NeuButton
          bg={theme.neuPrimaryBg}
          label="End Game"
          shadow={theme.newPrimaryShadow}
          onClick={() => forceFinishGame()}
        />
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        rowGap="1rem"
        minH="90vh"
        bg={theme.bgColor}
        backgroundImage={`https://axlegames.s3.ap-south-1.amazonaws.com/theme_assets/images/how-works-bg.png`}
        justifyContent="center"
        backgroundPosition={"center"}
        backgroundSize="cover"
        backgroundRepeat={"no-repeat"}
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

export default GuestWordle;
