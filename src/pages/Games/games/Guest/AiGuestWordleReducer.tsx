export enum KEY_ACTION {
  ON_ENTER,
  ON_DELETE,
  ON_KEY_PRESS,
  ON_INIT,
  ON_FETCH,
}
interface Payload {
  key: string;
  guessesStatus: string[];
  gameState: Array<Array<string>>;
  gameStatus: Array<Array<string>>;
  currentState?: WordleState;
  wordLength?: number;
  guessLength?: number;
  completedRows?: boolean[];
  currentGuess?: string;
  currentRow?: number;
  game?: string;
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
  guessLength: number;
  wordlength: number;
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
  guessLength: 5,
  wordlength: 5,
};

const createEmptyArrays = (number: number) => {
  const array = [];
  for (let i = 0; i < number; i++) array.push("");
  return array;
};

export const aiGuestWordleReducer = (
  state: WordleState,
  action: Action
): WordleState => {
  switch (action.type) {
    case KEY_ACTION.ON_FETCH:
      const filled = action.payload.gameState.length;
      const unfilled = action.payload.guessLength ?? 5;
      const empty = unfilled - filled;

      let completedRows = state.completedRows;
      for (let i = 0; i < filled; i++) completedRows[i] = true;

      for (let j = 0; j < filled; j++) completedRows[j] = true;
      const gameState = [...action.payload.gameState];
      const gameStatus = [...action.payload.gameStatus];

      for (let i = 0; i < empty; i++) {
        const emptyRow = createEmptyArrays(action.payload.wordLength ?? 5);
        gameState.push(emptyRow);
        gameStatus.push(emptyRow);
      }
      const wordlength = action.payload.wordLength ?? 5;
      const guessLength = action.payload.guessLength ?? 5;

      return {
        ...state,
        gameState: gameState,
        gameStatus: gameStatus,
        completedRows: completedRows,
        currentGuess: "",
        currentRow: filled,
        wordlength: wordlength,
        guessLength: guessLength,
      };
    case KEY_ACTION.ON_INIT:
      return action.payload.currentState ?? initState;
    case KEY_ACTION.ON_KEY_PRESS:
      if (state.currentGuess.length < state.wordlength) {
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
