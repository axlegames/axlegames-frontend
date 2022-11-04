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
  startsOn: Date;
  opensAt: Date;
  expiresAt: Date;
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
    contestId: string
  ): Promise<AxleContests> => {
    const response = await axios.get(`${gamePrefix}/contest/${contestId}`);
    let axleGames: AxleContests = response.data;
    return axleGames;
  };
}
