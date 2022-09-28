import axios from "axios";

import { axlegamesPrefix } from "../../config";

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

export class HomeServices {
  static getAxleGames = async (): Promise<AxleGames> => {
    const response = await axios.get(`${axlegamesPrefix}get-games`);
    let axleGames: AxleGames = response.data;
    return axleGames;
  };
}
