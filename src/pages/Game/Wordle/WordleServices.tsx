import axios from "axios";
import { rendlePrefix, headers } from "../../../config";

const token = headers() ?? "";

export class WordleServices {
  static enterContest = async (data: any) =>
    await axios.post(`${rendlePrefix}/enter`, data, token);
  static saveRendleGame = async (data: any) =>
    await axios.post(`${rendlePrefix}/save`, data, token);
  static getContestantStatus = async (data: any) =>
    await axios.post(`${rendlePrefix}/game/status`, data, token);
  static validateUpdateGuess = async (data: any) =>
    await axios.post(`${rendlePrefix}/game/word/validate`, data, token);

  static getStatusWord = (word: string): string[] => {
    const solution = "akash";
    const status: string[] = [];
    for (let i = 0; i < solution.length; i++) {
      if (solution[i] === word[i]) status.push("correct");
      else {
        const letterStatus = this.checkIsPresentOrAbsent(solution, word[i]);
        status.push(letterStatus);
      }
    }
    return status;
  };

  static checkIsPresentOrAbsent = (
    solution: string,
    letter: string
  ): string => {
    for (let i = 0; i < solution.length; i++)
      if (solution[i] === letter) return "present";
    return "absent";
  };
}
