import axios from "axios";

import Absurdle from "../../assets/home/highlight/games/absurdle.png";
import AnitWordle from "../../assets/home/highlight/games/anti-wordle.png";
import CrossWordle from "../../assets/home/highlight/games/cross-wordle.png";
import Framed from "../../assets/home/highlight/games/framed.png";
import Hurdle from "../../assets/home/highlight/games/hurdle.png";

import Lewdle from "../../assets/home/highlight/games/lewdle.png";
import Lookdle from "../../assets/home/highlight/games/lookdle.png";
import Nerdle from "../../assets/home/highlight/games/nerdle.png";
import Quordle from "../../assets/home/highlight/games/quordle.png";
import Redrctle from "../../assets/home/highlight/games/redrctle.png";
import Semantle from "../../assets/home/highlight/games/semantle.png";
import SpellBound from "../../assets/home/highlight/games/spellbound.png";
import Waffle from "../../assets/home/highlight/games/waffle.png";
import WordScramble from "../../assets/home/highlight/games/word-scramble.png";
import Wordle5 from "../../assets/home/highlight/games/wordle-5.png";
import Wordle7 from "../../assets/home/highlight/games/wordle-7.png";
import Wordle3 from "../../assets/home/highlight/games/wordle-6.png";

export interface AxleGame {
  id: string;
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
    const images = [
      Wordle5,
      Wordle3,
      Wordle7,
      Absurdle,
      AnitWordle,
      CrossWordle,
      Framed,
      Hurdle,
      Lewdle,
      Lookdle,
      Nerdle,
      Quordle,
      Redrctle,
      Semantle,
      SpellBound,
      Waffle,
      WordScramble,
    ];
    const response = await axios.get(
      "http://localhost:5000/axlegames/api/v1/get-games"
    );
    let axleGames: AxleGames = response.data;
    console.log(axleGames);
    for (let i = 0; i < axleGames.axleGames.length; i++)
      axleGames.axleGames[i].image = images[i];
    return axleGames;
  };
}
