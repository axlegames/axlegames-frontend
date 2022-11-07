import axios from "axios";

import { gamePrefix } from "../../config";
import { GameType, GameStatus } from "./enums/contests.enum";

export interface AxleGame {
  _id: string;
  isActive: boolean;
  name: string;
  description: string;
  link: string;
  image: string;
}

export interface AxleGames {
  axleGames: Array<AxleGame>;
}

export interface AxleContests {
  axleContests: Array<AxleContest>;
  error: boolean;
  now: string;
}

export interface AxleContest {
  _id: string;
  axleGame: string;
  gameType: GameType;
  axleContestants: string[];
  status: GameStatus;
  axleContestInfo?: AxleContestInfo;
  action: Function;
}

export interface AxleContestInfo {
  _id: string;
  startsOn: string;
  opensAt: string;
  expiresAt: string;
  entryFee: number;
  prizePool: number;
}

export class HomeServices {
  static getAxleGames = async (): Promise<AxleGames> => {
    const response = await axios.get(`${gamePrefix}`);
    let axleGames: AxleGames = response.data;
    return axleGames;
  };

  static getAxleGameContest = async (
    gameTypeId: string
  ): Promise<AxleContests> => {
    const response = await axios.get(`${gamePrefix}/contest/${gameTypeId}`);
    let axleGames: AxleContests = response.data;
    return axleGames;
  };
}
