import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, useToast } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

import Navbar from "../../components/Navbar";
import KeyBoard from "../../components/Keyboard";

import WonModal from "../../modals/WonModal";
import LostModal from "../../modals/LostModal";
import MenuModal from "../../modals/MenuModal";

import { GameServices, Status, GuessStatus } from "../../GameServices";
import {
  KEY_ACTION,
  initState,
  aiGuestWordleReducer,
  WordleState,
} from "./AiGuestWordleReducer";

import NeuButton from "../../../Axle/component/NeuButton";
import AIWordleGrid from "../AIWordle/components/AIWordleGrid";

const AIWordle = () => {
  const toast = useToast();

  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);

  const navigate = useNavigate();

  const { contestId, gameStateId, isContest } = useParams();
  const game = "aiwordle";

  const [state, dispatch] = useReducer(aiGuestWordleReducer, initState);

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
        console.log(game);
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
  }, [gameStateId, contestId]);

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
      game: "AI_WORDLE_" + state.wordlength.toString(),
      word: state.currentGuess.toLowerCase(),
      contestId: contestId,
      gameStateId: gameStateId,
    });
    const { guessStatus, inValidWord, isWinningWord } = resp as GuessStatus;

    if (state.currentRow === 15) return forceFinishGame();

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
    if (!isWinningWord) gameState.push(emptyRow);

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
        userId: localStorage.getItem("userId"),
        word: state.currentGuess.toLowerCase(),
        contestId: contestId,
        gameStateId: gameStateId,
      },
      true
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
    let result: string = `Hi! I have guessed this ${state.wordlength}-letter word in ${state.currentRow} tries on Axlegames.io - a skill-based AI gaming platform that is introducing Metamorphosis AI games to web3. Signup using the link below and win 500 AXLE tokens by playing your first AI game - https://play.axlegames.io`;

    window.open(
      `https://twitter.com/intent/tweet?text=${result}`,
      "_blank" // <- This is what makes it open in a new window.
    );

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
      <Navbar
        game={"aiwordle"}
        username={localStorage.getItem("guestname")}
        title={`AI WORDLE ${state.wordlength}`}
      />
      <MenuModal
        title={"Hooray!"}
        isOpen={isWon}
        children={
          <WonModal
            tries={state.currentRow}
            letter={state.wordlength}
            isGuest={true}
            isAIWordle={true}
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

      <Box p={8} bg={theme.bgColor} display={"flex"} justifyContent="flex-end">
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
        justifyContent="space-between"
        rowGap="1rem"
        p={4}
        minH="90vh"
        bg={theme.bgColor}
        backgroundImage={`https://axlegames.s3.ap-south-1.amazonaws.com/theme_assets/images/how-works-bg.png`}
        backgroundPosition={"center"}
        backgroundSize="cover"
        backgroundRepeat={"no-repeat"}
      >
        <AIWordleGrid
          gameStatus={state.gameStatus}
          completedRows={state.completedRows}
          game={state.gameState}
        />
        <Box display={"flex"} justifyContent="center" pos={"relative"}>
          <Box pb={8} bottom={0}>
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
      </Box>
    </Box>
  );
};

export default AIWordle;
