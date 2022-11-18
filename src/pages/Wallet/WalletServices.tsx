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

export enum PaymentStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export class WalletServices {
  static createOrder = async (
    orderAmount: number
  ): Promise<any | TokenAuthStatus> =>
    (
      await axios.post(
        `${userPrefix}/wallets/create-order`,
        { amount: orderAmount },
        token
      )
    ).data;

  static depositTokens = async (
    data: any
  ): Promise<PaymentStatus | TokenAuthStatus> =>
    (await axios.post(`${userPrefix}/wallets/deposit-tokens`, data, token))
      .data;

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
