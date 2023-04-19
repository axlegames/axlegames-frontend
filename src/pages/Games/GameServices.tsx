import axios from "axios";
import { headers, gamePrefix, guestPrefix } from "../../config";
import { TokenAuthStatus } from "../../config/auth";
import { GameStatus, GameType } from "../Home/enums/contests.enum";

const token = headers() ?? "";

export interface Status {
  name?: string;
  wordList: Array<Array<string>>;
  gameStatus: Array<Array<string>>;
  hasGameState: boolean;
  isWinningWord?: boolean;
  isGameCompeted: boolean;
  wordLength: number;
  guessLength: number;
  hasPlayingAnotherGame?: boolean;
}

export interface GuessStatus {
  guessStatus?: string[];
  isWinningWord?: boolean;
  inValidWord?: boolean;
  guessLength?: number;
}

export interface LeaderboardInterface {
  isWon: boolean;
  axleContest: string;
  chances: number;
  createdAt: Date;
  compeletedAt: Date;
  username: string;
  userId: string;
  time: number;
  reward: number;
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
  PRACTICE_GAME = "PRACTICE_GAME",
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
  name?: string;
  type?: GameType;
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

export interface LobbyInterface {
  contest: Contest;
  currentTime: Date;
}

export interface PlayerStats {
  winPercent?: number;
  currentStreak?: number;
  maxStreak?: number;
  played: number;
}

export class GameServices {
  static getPlayerStats = async (contestId: string): Promise<PlayerStats> => {
    const userId = localStorage.getItem("userId") || "";
    return await (
      await axios.get(`${gamePrefix}/streak/${contestId}/${userId}`)
    ).data;
  };

  static getContestLeaderboardResults = async (
    contestName: string
  ): Promise<{
    error: boolean;
    axleContests: Array<LeaderboardInterface>;
  }> => {
    return await (
      await axios.get(`${gamePrefix}/contest/leaderboard/${contestName}`)
    ).data;
  };

  static getContestsList = async (body: {
    game: string;
    date: Date;
  }): Promise<Array<string>> => {
    const resp = await axios.post(`${gamePrefix}/gamenight/contest/list`, body);
    console.log(resp);
    return resp.data.axleContests;
  };

  static createGuestGameState = async (data: {
    guest: string;
    contestId: string;
  }) => {
    return await (
      await axios.post(`${guestPrefix}/games/create`, data)
    ).data;
  };

  static cleanGuestGameState = async (data: { gameStateId: string }) => {
    return await (
      await axios.post(`${guestPrefix}/games/clean`, data)
    ).data;
  };

  static getGuestGameState = async (data: any): Promise<Status> =>
    await (
      await axios.post(`${guestPrefix}/games/status`, data)
    ).data;

  static validateUpdateGuestGuess = async (data: any): Promise<GuessStatus> => {
    const resp = await axios.post(`${guestPrefix}/games/validate`, data);
    return {
      inValidWord: resp.data.inValidWord,
      guessStatus: resp.data.guessStatus,
      isWinningWord: resp.data.isWinningWord,
    };
  };

  static enterContest = async (
    data: any
  ): Promise<EntryStatus | TokenAuthStatus> => {
    return await (
      await axios.post(`${gamePrefix}/enter`, data, token)
    ).data;
  };

  static getGameState = async (data: any): Promise<Status | TokenAuthStatus> =>
    await (
      await axios.post(`${gamePrefix}/status`, data, token)
    ).data;

  static cleanGameState = async (data: any): Promise<void> =>
    await axios.post(`${gamePrefix}/clean`, data, token);

  static getLobbyStats = async (
    contestId: string
  ): Promise<LobbyInterface | TokenAuthStatus> => {
    return await (
      await axios.get(`${gamePrefix}/lobby/${contestId}`, token)
    ).data;
  };

  static validateUpdateGuess = async (
    data: any,
    isAiWordle: boolean
  ): Promise<GuessStatus | TokenAuthStatus> => {
    let val = "/validate/word";
    if (isAiWordle) val = "/validate/word/absurdle";
    const resp = await axios.post(`${gamePrefix}${val}`, data, token);
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
