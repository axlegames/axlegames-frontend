import axios from "axios";

import { headers, gamePrefix } from "../../config";
import { TokenAuthStatus } from "../../config/auth";

const token = headers() ?? "";

export interface GameHistoryModel {
  _id: string;
  axleContest: string;
  transactionType: string;
  game: string;
  type: string;
  gameType: string;
  fee: number;
  reward: number;
}

export interface RewardsModel {
  balance: number;
  staking: number;
  referral: number;
  bonus: number;
  error: boolean;
}

export class DashBoardServices {
  static getRewardsAndBalance = async (): Promise<
    RewardsModel | TokenAuthStatus
  > => {
    const { data } = await axios.post(
      `${gamePrefix}/rewards`,
      { userId: localStorage.getItem("userId") ?? "" },
      token
    );
    return data;
  };
  static getGameHistory = async (): Promise<
    Array<GameHistoryModel> | TokenAuthStatus
  > => {
    const { data } = await axios.post(
      `${gamePrefix}/transactions`,
      { userId: localStorage.getItem("userId") ?? "" },
      token
    );
    return data.gameResults;
  };
}
