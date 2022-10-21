import axios from "axios";
import { headers, gamePrefix } from "../../config";

const token = headers() ?? "";

export interface Status {
  wordList: Array<Array<string>>;
  gameStatus: Array<Array<string>>;
  hasGameState: boolean;
  isWinningWord?: boolean;
  isGameCompeted: boolean;
  wordLength: number;
  guessLength: number;
}

export interface GuessStatus {
  guessStatus?: string[];
  isWinningWord?: boolean;
  inValidWord?: boolean;
}

export class WordleServices {
  static enterContest = async (data: any) => {
    return await axios.post(`${gamePrefix}/enter`, data, token);
  };

  static getGameState = async (data: any): Promise<Status> =>
    await (
      await axios.post(`${gamePrefix}/status`, data, token)
    ).data;

  static cleanGameState = async (data: any): Promise<void> =>
    await axios.post(`${gamePrefix}/clean`, data, token);

  static validateUpdateGuess = async (data: any): Promise<GuessStatus> => {
    const resp = await axios.post(
      `${gamePrefix}/validate/word`,

      data,
      token
    );
    return {
      inValidWord: resp.data.inValidWord,
      guessStatus: resp.data.guessStatus,
      isWinningWord: resp.data.isWinningWord,
    };
  };

  static saveGame = async (
    userId: string,
    contestId: string,
    chances: number,
    isWon: boolean
  ) => {
    return await axios.post(
      `${gamePrefix}/save`,
      {
        userId,
        contestId,
        chances,
        isWon,
      },
      token
    );
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
