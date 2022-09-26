import { Box, useToast } from "@chakra-ui/react";
import { useReducer } from "react";
import { theme } from "../../../config/theme.config";
import Grid from "./components/Grid";
import KeyBoard from "./components/Keyboard";
import Navbar from "./components/Navbar";
import { KEY_ACTION, initState, reducer } from "./WordleReducer";

const Wordle = () => {
  const toast = useToast();
  const [state, dispatch] = useReducer(reducer, initState);

  const onKeyPress = (key: string) => {
    return dispatch({ type: KEY_ACTION.ON_KEY_PRESS, payload: { key: key } });
  };

  const onEnter = () => {
    if (state.currentGuess.length < 5) {
      return toast({
        title: "Not enough letters",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
    return dispatch({ type: KEY_ACTION.ON_ENTER, payload: { key: "" } });
  };

  const onDelete = () =>
    dispatch({ type: KEY_ACTION.ON_DELETE, payload: { key: "" } });

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
