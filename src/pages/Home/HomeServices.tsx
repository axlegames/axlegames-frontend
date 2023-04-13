import axios from "axios";

import { gamePrefix, referralPrefix } from "../../config";
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
  currentTime: string;
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
  contestName: string;
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

export interface UserReferral {
  username: string;
  referralCode: string;
  error: boolean;
}

export class HomeServices {
  static getAxleGames = async (type: string): Promise<AxleGames> => {
    const response = await axios.get(`${gamePrefix}/${type}`);
    let axleGames: AxleGames = response.data;
    return axleGames;
  };

  static getAdminReferralCode = async (): Promise<UserReferral> => {
    const response = await axios.get(`${referralPrefix}/admin`);
    let axleGames: UserReferral = response.data;
    return axleGames;
  };

  static getAxleGameContest = async (
    gameTypeId: string,
    type: string
  ): Promise<AxleContests> => {
    const response = await axios.get(
      `${gamePrefix}/contest/${gameTypeId}/${type}`
    );
    let axleGames: AxleContests = response.data;
    return axleGames;
  };
}
