import axios from "axios";

import { gamePrefix } from "../../config";

export interface Task {
  _id: string;
  createdAt: string;
  task: string;
  invites?: number;
  completeIn?: number;
  noOfChances?: number;
  gameWins?: number;
  profileCompletion?: number;
  axleContests: string[];
}

export interface Challenge {
  _id: string;
  createdAt: string;
  game: string;
  pool: number;
  entryFee: number;
  challengeType: string;
  task: Task;
  isIn: boolean;
}

export interface Challenges {
  challenges: Challenge[];
}

export interface Reward {
  challengerId: string;
  challengeId: string;
  reward: number;
}
export interface Contest {
  _id: string;
  created: string;
  axleGame: string;
  gameType: string;
  contestName: string;
  axleContestInfo: string;
  expiresAt: string;
  game: string;
  link: string;
}

export interface ChallengeStatus {
  _id: string;
  createdAt: string;
  isCompleted: boolean;
  task: {
    _id: string;
    createdAt: string;
    task: string;
    noOfChances?: number;
    invites?: number;
    contests: Contest[];
  };
}

export class ChallengeServices {
  static getChallenges = async (): Promise<Challenges> => {
    const user = localStorage.getItem("userId");
    const response = await axios.get(`${gamePrefix}/challenges/${user}`);
    return response.data;
  };

  static sendReward = async (data: Reward) => {
    const response = await axios.post(`${gamePrefix}/challenges/reward`, data);
    return response.data;
  };

  static getChallengesByGame = async (name: string): Promise<Challenges> => {
    const response = await axios.get(`${gamePrefix}/challenges/${name}`);
    return response.data;
  };

  static getChallengerStats = async (
    challengeId: string
  ): Promise<ChallengeStatus[]> => {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(
      `${gamePrefix}/challenges/stats/${userId}/${challengeId}`
    );
    return response.data.challenges;
  };

  static getWinners = async (challengeId: string) => {
    const response = await axios.post(`${gamePrefix}/challenges/winners/`, {
      challengeId: challengeId,
    });
    return response.data;
  };

  static updateChallenge = async (
    challengeId: string
  ): Promise<{ message: string }> => {
    const response = await axios.post(
      `${gamePrefix}/challenges/update/${challengeId}`
    );
    return response.data;
  };

  static enterChallenge = async (challengeId: string) => {
    const userId = localStorage.getItem("userId");
    const response = await axios.post(`${gamePrefix}/challenges/enter`, {
      challengeId,
      userId,
    });
    return response.data;
  };
}
