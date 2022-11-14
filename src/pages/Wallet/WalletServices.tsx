import axios from "axios";
import { headers, userPrefix } from "../../config";
import { TokenAuthStatus } from "../../config/auth";

export interface Fee {
  _id: string;
  wallet: string;
  createdAt: string;
  transactionType: string;
  game: string;
  gameType: string;
  fee: number;
  reward: number;
  currentBalance: number;
}

export interface Transactions {
  transactions: Fee[];
  balance: number;
}

const token = headers() ?? "";

export class WalletServices {
  static getUserTransactions = async (): Promise<
    Transactions | TokenAuthStatus
  > =>
    (
      await axios.get(
        `${userPrefix}/transactions/${localStorage.getItem("userId")}`,
        token
      )
    ).data;
}
