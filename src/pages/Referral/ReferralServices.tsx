import axios from "axios";
import { gamePrefix, headers } from "../../config";
import { TokenAuthStatus } from "../../config/auth";

export interface ReferralModel {
  referrals: string[];
  referralCode: string;
  username: string;
}

const token = headers() ?? "";

export class ReferralServices {
  static getReferralAndReferralCode = async (
    referralCode: string = ""
  ): Promise<ReferralModel | TokenAuthStatus> => {
    const { data } = await axios.post(
      `${gamePrefix}/referrals`,
      {
        userId: localStorage.getItem("userId") ?? "",
        referralCode: referralCode,
      },
      token
    );
    return data;
  };
}
