export enum KEY_ACTION {
  ON_ENTER,
  ON_DELETE,
  ON_KEY_PRESS,
  ON_INIT,
}
interface Payload {
  key: string;
  guessesStatus: string[];
  gameState: Array<Array<string>>;
  gameStatus: Array<Array<string>>;
}
interface Action {
  type: KEY_ACTION;
  payload: Payload;
}
export interface WordleState {
  gameState: Array<Array<string>>;
  gameStatus: Array<Array<string>>;
  completedRows: boolean[];
  currentGuess: string;
  currentRow: number;
}

export const initState: WordleState = {
  gameState: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
  gameStatus: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
  completedRows: [false, false, false, false, false],
  currentGuess: "",
  currentRow: 0,
};

const createEmptyArrays = (number: number) => {
  const array = [];
  for (let i = 0; i < number; i++) array.push("");
  return array;
};

export const reducer = (state: WordleState, action: Action): WordleState => {
  switch (action.type) {
    case KEY_ACTION.ON_INIT:
      let game = state;
      const filled = action.payload.gameState.length;
      const empty = 5 - filled;

      let completedRows = state.completedRows;
      for (let j = 0; j < filled; j++) completedRows[j] = true;

      const gameState = [...action.payload.gameState];
      const gameStatus = [...action.payload.gameStatus];

      for (let i = 0; i < empty; i++) {
        const emptyRow = createEmptyArrays(5);
        gameState.push(emptyRow);
        gameStatus.push(emptyRow);
      }

      game.currentRow = filled;
      game.completedRows = completedRows;
      game.gameState = gameState;
      game.gameStatus = gameStatus;

      return game;
    case KEY_ACTION.ON_KEY_PRESS:
      if (state.currentGuess.length < 5) {
        console.log("hee");
        // setting current guess
        let _currentGuess = state.currentGuess + action.payload.key;
        state.currentGuess = _currentGuess;
        // getting current game state
        let _currentGame = state.gameState;
        // getting current game row
        let _currentRowGameState = _currentGame[state.currentRow];
        // modifying with currentGameRow with currentGuess
        for (let i = 0; i < _currentRowGameState.length; i++)
          _currentRowGameState[i] = _currentGuess[i];
        // setting currentRowState
        _currentGame[state.currentRow] = _currentRowGameState;
        return {
          ...state,
          currentGuess: _currentGuess,
          gameState: _currentGame,
        };
      }
      return { ...state };

    case KEY_ACTION.ON_ENTER:
      if (state.currentRow < 5 && state.currentGuess.length === 5) {
        // onenter flip the keys
        let _completedRows = state.completedRows;
        _completedRows[state.currentRow] = true;
        let _currentGameStatus = state.gameStatus;
        _currentGameStatus[state.currentRow] = action.payload.guessesStatus;
        return {
          ...state,
          currentRow: state.currentRow + 1,
          currentGuess: "",
          completedRows: _completedRows,
          gameStatus: _currentGameStatus,
        };
      }
      return state;
    case KEY_ACTION.ON_DELETE:
      // setting current guess
      let _currentGuess = state.currentGuess;
      // popping the last letter
      _currentGuess = _currentGuess.slice(0, -1);
      // changing game state
      let _currentGame = state.gameState;
      let _currentRowGameState = _currentGame[state.currentRow];
      for (let i = 0; i < _currentRowGameState.length; i++)
        _currentRowGameState[i] = _currentGuess[i];
      _currentGame[state.currentRow] = _currentRowGameState;
      return {
        ...state,
        currentGuess: _currentGuess,
        gameState: _currentGame,
      };
    default:
      return state;
  }
};
