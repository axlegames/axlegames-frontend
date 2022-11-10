import axios from "axios";
import { userPrefix } from "../../config";

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

export class WalletServices {
  static getUserTransactions = async (): Promise<Transactions> =>
    (
      await axios.get(
        `${userPrefix}/transactions/${localStorage.getItem("userId")}`
      )
    ).data;
}
