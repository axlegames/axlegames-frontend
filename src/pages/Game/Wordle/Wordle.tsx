import { Box, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { theme } from "../../../config/theme.config";
import Grid from "./components/Grid";
import KeyBoard from "./components/Keyboard";
import Navbar from "./components/Navbar";
import { WordleServices } from "./WordleServices";

const Wordle = () => {
  const [gameState, setGameState] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const [gameStatus, setGameStatus] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const [completedRows, setCompletedRows] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const toast = useToast();

  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRow, setCurrentRow] = useState(0);

  const onKeyPress = (key: string) => {
    if (currentGuess.length < 5) {
      // setting current guess
      let _currentGuess = currentGuess + key;
      setCurrentGuess(_currentGuess);
      // getting current game state
      let _currentGame = gameState;
      // getting current game row
      let _currentRowGameState = _currentGame[currentRow];
      // modifying with currentGameRow with currentGuess
      for (let i = 0; i < _currentRowGameState.length; i++)
        _currentRowGameState[i] = _currentGuess[i];
      // setting currentRowState
      _currentGame[currentRow] = _currentRowGameState;
      setGameState(_currentGame);
    }
  };

  const onEnter = () => {
    if (currentGuess.length === 0) {
      return toast({
        title: "Not enough letters",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }

    if (currentRow < 5 && currentGuess.length === 5) {
      // onenter flip the keys
      let _completedRows = completedRows;
      _completedRows[currentRow] = true;

      let _currentGameStatus = gameStatus;
      _currentGameStatus[currentRow] =
        WordleServices.getStatusWord(currentGuess);
      setCurrentRow(currentRow + 1);
      setCurrentGuess("");
      setCompletedRows(_completedRows);
      setGameStatus(_currentGameStatus);
    } else {
      return toast({
        title: "Not enough letters",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const onDelete = () => {
    // setting current guess
    let _currentGuess = currentGuess;
    // popping the last letter
    _currentGuess = _currentGuess.slice(0, -1);
    setCurrentGuess(_currentGuess);
    // changing game state
    let _currentGame = gameState;
    let _currentRowGameState = _currentGame[currentRow];
    for (let i = 0; i < _currentRowGameState.length; i++) {
      _currentRowGameState[i] = _currentGuess[i];
    }
    _currentGame[currentRow] = _currentRowGameState;
    setGameState(_currentGame);
  };

  return (
    <Box>
      <Navbar />
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
          gameStatus={gameStatus}
          completedRows={completedRows}
          game={gameState}
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
