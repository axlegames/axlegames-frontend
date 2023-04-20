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
  PlayerStats,
} from "../../GameServices";
import {
  KEY_ACTION,
  initState,
  aiWordleReducer,
  WordleState,
} from "./AIWordleReducer";

import { TokenAuthStatus } from "../../../../config/auth";

import AIWordleGrid from "./components/AIWordleGrid";
import NeuButton from "../../../Axle/component/NeuButton";

const AIWordle = () => {
  const toast = useToast();

  const [currentTime, setCurrentTime] = useState(Date.now());
  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);

  const navigate = useNavigate();

  const { contestId, gameStateId, isContest } = useParams();
  const game = "aiwordle";

  const [stats, setStats] = useState<PlayerStats>({
    currentStreak: 0,
    maxStreak: 0,
    played: 0,
    winPercent: 0,
  });
  const [state, dispatch] = useReducer(aiWordleReducer, initState);

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

  const initializeState = (game: Status) => {
    const completedRows = GameServices.initRows(1);
    const initState: WordleState = {
      guessLength: 1,
      wordlength: game.wordLength,
      gameState: GameServices.createInitState(
        game.guessLength,
        game.wordLength
      ),
      gameStatus: GameServices.createInitState(1, game.wordLength),
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

  const fectchState = (game: Status) => {
    console.log("here");
    console.log(game.wordLength);
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

  useEffect(() => {
    GameServices.getGameState({
      userId: localStorage.getItem("userId"),
    })
      .then(async (game) => {
        console.log(game);
        isAuthorized(game as TokenAuthStatus);
        game = game as Status;
        if (game.isGameCompeted)
          if (game.isWinningWord) setIsWon(true);
          else setIsLost(true);
        if (game.wordList.length > 0) {
          await GameServices.cleanGameState({
            userId: localStorage.getItem("userId"),
            isReset: true,
          });
          fectchState(game);
        } else initializeState(game);
      })
      .catch((err) => console.log(err));

    GameServices.getPlayerStats(contestId || "").then((resp) => {
      console.log(resp);
      setStats(resp);
    });

    return () => {
      dispatch({
        type: KEY_ACTION.ON_ENTER,
        payload: {
          key: "",
          guessesStatus: [],
          guessLength: state.guessLength,
          gameState: [[]],
          gameStatus: [[]],
          game: "AI_WORDLE",
        },
      });
      setIsWon(false);
      setIsLost(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isContest === "true") {
      GameServices.getLobbyStats(contestId || "")
        .then((res) => {
          isAuthorized(res as TokenAuthStatus);
          const r = res as LobbyInterface;
          const contestInfo = r.contest.axleContestInfo;
          const opensAt = new Date(contestInfo.opensAt).getTime();
          const time = new Date(Date.now()).getTime();
          console.log(r.currentTime);
          setCurrentTime(new Date(r.currentTime).getTime());
          console.log(new Date(currentTime));
          const isOpened = opensAt - time < 0 ? true : false;
          if (!isOpened)
            return navigate(`/${game}/lobby/${contestId}/${gameStateId}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
    const resp = await GameServices.validateUpdateGuess(
      {
        userId: localStorage.getItem("userId") || "",
        word: state.currentGuess.toLowerCase(),
        contestId: contestId,
        gameStateId: gameStateId,
      },
      true
    );
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
    if (!isWinningWord) gameState.push(emptyRow);

    const currentGuessStatus = guessStatus || [];

    const gameStatus = state.gameStatus;
    const len = gameStatus[gameStatus.length - 1].length;
    if (len === 0) gameStatus.push(currentGuessStatus);
    else gameStatus.push([]);

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
        isReset: false,
      });
      setIsWon(true);
      GameServices.saveGame(
        localStorage.getItem("userId") ?? "",
        contestId ?? "",
        state.currentRow + 1,
        true
      )
        .then((r) => {
          GameServices.getPlayerStats(contestId || "").then((resp) => {
            console.log(r);
            setStats(resp);
            setIsWon(true);
          });
        })
        .catch((e) => console.log(e));
    }

    if (state.currentRow === 15) {
      await GameServices.cleanGameState({
        userId: localStorage.getItem("userId"),
        isReset: false,
      });
      setIsLost(true);
      GameServices.saveGame(
        localStorage.getItem("userId") ?? "",
        contestId ?? "",
        state.currentRow + 1,
        false
      )
        .then((r) => {
          GameServices.getPlayerStats(contestId || "").then((resp) => {
            setStats(resp);
            setIsLost(true);
            console.log(r);
          });
        })
        .catch((e) => console.log(e));
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
    isAuthorized(resp as TokenAuthStatus);
    const { isWinningWord } = resp as GuessStatus;
    await GameServices.cleanGameState({
      userId: localStorage.getItem("userId"),
      reset: true,
    });
    if (isWinningWord) {
      setIsWon(true);
      GameServices.saveGame(
        localStorage.getItem("userId") ?? "",
        contestId ?? "",
        state.currentRow + 1,
        true
      )
        .then((r) => {
          GameServices.getPlayerStats(contestId || "").then((resp) => {
            setStats(resp);
            setIsWon(true);
            console.log(r);
          });
        })
        .catch((e) => console.log(e));
    } else {
      setIsLost(true);
      GameServices.saveGame(
        localStorage.getItem("userId") ?? "",
        contestId ?? "",
        state.currentRow + 1,
        false
      )
        .then((r) => {
          GameServices.getPlayerStats(contestId || "").then((resp) => {
            setStats(resp);
            setIsLost(true);
            console.log(r);
          });
        })
        .catch((e) => console.log(e));
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

  const shareResult = () => {
    let result: string = `Hi! I have guessed the ${state.wordlength}-letter word in ${state.currentRow} tries on axlegames.io - First ever skill-based AI gaming platform introducing Metamorphosis AI games to web3. Signup, Play, and Share your result to earn free AXLE tokens. Presale coming soon on Pinksale. @AxleGames #Gamefi #AI`;
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
        action={() => forceFinishGame()}
        game={`aiwordle`}
        username={localStorage.getItem("username")}
        title={`AI WORDLE ${state.wordlength}`}
      />

      <Box p={8} bg={theme.bgColor} display={"flex"} justifyContent="flex-end">
        <NeuButton
          bg={theme.neuPrimaryBg}
          label="End Game"
          shadow={theme.newPrimaryShadow}
          onClick={() => forceFinishGame()}
        />
      </Box>
      <MenuModal
        title={"Hooray!"}
        isOpen={isWon}
        children={
          <WonModal
            isContest={isContest || ""}
            isGuest={false}
            tries={state.currentRow}
            letter={state.wordlength}
            isAIWordle={true}
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
        children={
          <LostModal
            isPractice={isContest || ""}
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
