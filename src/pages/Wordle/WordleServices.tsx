import axios from "axios";
import { headers, gamePrefix } from "../../config";
import { GameStatus } from "../Home/enums/contests.enum";

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

export enum ENTRY_STATUS {
  OK = "OK",
  ALREADY_IN_GAME = "ALREADY_IN_GAME",
  IN_SUFFICENT_FUNDS = "IN_SUFFICENT_FUNDS",
  ALREADY_IN_OTHER_GAME = "ALREADY_IN_OTHER_GAME",
  CONTEST_DOESNOT_EXIST = "CONTEST_DOESNOT_EXIST",
  WALLET_DOESTNOT_EXIST = "WALLET_DOESTNOT_EXIST",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  ENTER_CONTEST = "ENTER_CONTEST",
  ALREADY_PARTICIPATED_IN_THIS_CONTEST = "ALREADY_PARTICIPATED_IN_THIS_CONTEST",
}

export interface GameState {
  _id: string;
  user: string;
  axleContest: string;
  words: string[];
}
export interface EntryStatus {
  status: ENTRY_STATUS;
  gameState: GameState;
}

export interface AxleContestInfo {
  _id: string;
  startsOn: string;
  opensAt: string;
  expiresAt: string;
  entryFee: number;
  prizePool: number;
  minimumContestants: number;
}

export interface Contest {
  _id: string;
  axleGame: string;
  gameType: string;
  axleContestInfo: AxleContestInfo;
  axleContestants: string[];
  status: GameStatus;
}

export class WordleServices {
  static enterContest = async (data: any): Promise<EntryStatus> => {
    return await (
      await axios.post(`${gamePrefix}/enter`, data, token)
    ).data;
  };

  static getGameState = async (data: any): Promise<Status> =>
    await (
      await axios.post(`${gamePrefix}/status`, data, token)
    ).data;

  static cleanGameState = async (data: any): Promise<void> =>
    await axios.post(`${gamePrefix}/clean`, data, token);

  static getLobbyStats = async (contestId: string): Promise<Contest> => {
    return await (
      await axios.get(`${gamePrefix}/lobby/${contestId}`)
    ).data.contest;
  };

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
