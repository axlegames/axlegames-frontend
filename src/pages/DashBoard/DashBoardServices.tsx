import axios from "axios";

import { headers, gamePrefix } from "../../config";

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

export interface ReferralModel {
  referrals: string[];
  referralCode: string;
}

export interface RewardsModel {
  balance: number;
  staking: number;
  referral: number;
  bonus: number;
  error: boolean;
}

export class DashBoardServices {
  static getRewardsAndBalance = async (): Promise<RewardsModel> => {
    const { data } = await axios.post(
      `${gamePrefix}/rewards`,
      { userId: localStorage.getItem("userId") ?? "" },
      token
    );
    return data;
  };
  static getGameHistory = async (): Promise<Array<GameHistoryModel>> => {
    const { data } = await axios.post(
      `${gamePrefix}/transactions`,
      { userId: localStorage.getItem("userId") ?? "" },
      token
    );
    return data.gameResults;
  };

  static getReferralAndReferralCode = async (): Promise<ReferralModel> => {
    const { data } = await axios.post(
      `${gamePrefix}/referrals`,
      { userId: localStorage.getItem("userId") ?? "" },
      token
    );
    console.log(data);
    return data;
  };
}
