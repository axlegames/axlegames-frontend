import axios from "axios";
import { headers, axlegamesPrefix } from "../../../config";

const token = headers() ?? "";

interface Status {
  wordList: Array<Array<string>>;
  gameStatus: Array<Array<string>>;
  hasGameState: boolean;
  isWinningWord?: boolean;
  isGameCompeted: boolean;
  wordLength: number;
  guessLength: number;
}

interface GuessStatus {
  guessStatus?: string[];
  isWinningWord?: boolean;
  inValidWord?: boolean;
}

export class WordleServices {
  static enterContest = async (data: any) => {
    return await axios.post(`${axlegamesPrefix}enter-contest`, data, token);
  };

  static getGameState = async (data: any): Promise<Status> => {
    return await (
      await axios.post(`${axlegamesPrefix}status`, data, token)
    ).data;
  };

  static cleanGameState = async (data: any) => {
    return await axios.post(`${axlegamesPrefix}clean`, data, token);
  };

  static validateUpdateGuess = async (data: any): Promise<GuessStatus> => {
    const resp = await axios.post(
      `${axlegamesPrefix}validate-word`,
      data,
      token
    );
    console.log(resp);
    return {
      inValidWord: resp.data.inValidWord,
      guessStatus: resp.data.guessStatus,
      isWinningWord: resp.data.isWinningWord,
    };
  };

  static generateEmptyRows = (noOfRows: number): string[] => {
    const rows: string[] = [];
    for (let i = 0; i < noOfRows; i++) rows.push("");
    return rows;
  };

  static initRows = (guessLength: number): boolean[] => {
    const rows = [];
    for (let i = 0; i < guessLength; i++) rows.push(false);
    return rows;
  };

  static createInitState = (
    guessLength: number,
    wordLength: number
  ): Array<Array<string>> => {
    const words: Array<Array<string>> = [];
    for (let i = 0; i < guessLength; i++)
      words.push(this.generateEmptyRows(wordLength));
    return words;
  };
}
