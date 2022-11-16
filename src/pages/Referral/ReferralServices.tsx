import axios from "axios";
import { gamePrefix, headers } from "../../config";
import { TokenAuthStatus } from "../../config/auth";

export interface ReferralModel {
  referrals: string[];
  referralCode: string;
}

const token = headers() ?? "";

export class ReferralServices {
  static getReferralAndReferralCode = async (): Promise<
    ReferralModel | TokenAuthStatus
  > => {
    const { data } = await axios.post(
      `${gamePrefix}/referrals`,
      { userId: localStorage.getItem("userId") ?? "" },
      token
    );
    return data;
  };
}
