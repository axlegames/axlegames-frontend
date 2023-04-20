import env from "react-dotenv";

import TokenAbiMainnet from "./mainnet/AxleTokenMain.json";
import PresaleAbiMainnet from "./mainnet/AxlePresaleMain.json";

import TokenAbiTestnet from "../abi/testnet/AxleTokenTest.json";
import PresaleAbiTestnet from "../abi/testnet/AxlePresaleTest.json";
import StakingAbiTestnet from "../abi/testnet/AxleStakingTest.json";

interface Chain {
  chainName: string;
  chainId: number;
  nativeCurrency: {
    name: string;
    decimals: 18;
    symbol: string;
  };
  rpcUrls: string[];
}

interface Creds {
  AXLE_CONTRACT: string;
  AXLE_ZEUS_PRESALE: string;
  AXLE_STAKING: string;
  AXLE_SENDER: string;
  tokenAbi: any;
  presaleAbi: any;
  stakingAbi: any;
  isTestNet: boolean;
  chain: Chain;
}

const mainnet: Creds = {
  AXLE_CONTRACT: "0x7c56C79a454CBFaf63BAdb39f82555109a2A80Bf",
  AXLE_ZEUS_PRESALE: "0xeA29a0f11EaAF0f88DBf705b2b53A09767cDF305",
  tokenAbi: TokenAbiMainnet,
  presaleAbi: PresaleAbiMainnet,
  stakingAbi: null,
  AXLE_STAKING: "",
  AXLE_SENDER: "",
  isTestNet: true,
  chain: {
    chainName: "Smart Chain",
    chainId: 56,
    nativeCurrency: {
      name: "Smart Chain",
      decimals: 18,
      symbol: "BNB",
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
  },
};

const testnet: Creds = {
  AXLE_CONTRACT: "0x3b12b9ec6a9f1514809eed63597c13ff6146aa08",
  AXLE_ZEUS_PRESALE: "0xaed66d62e70023762ba0977f5304116120706d84",
  AXLE_STAKING: "",
  AXLE_SENDER: "",
  stakingAbi: StakingAbiTestnet,
  tokenAbi: TokenAbiTestnet,
  presaleAbi: PresaleAbiTestnet,
  isTestNet: true,
  chain: {
    chainName: "BSC Testnet",
    chainId: 97,
    nativeCurrency: {
      name: "BSC Testnet",
      decimals: 18,
      symbol: "BNB",
    },
    rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"],
  },
};

// const isDevServer = env.IS_DEV_SERVER;

let creds: Creds = {
  AXLE_CONTRACT: "",
  AXLE_ZEUS_PRESALE: "",
  AXLE_SENDER: "",
  AXLE_STAKING: "",
  presaleAbi: null,
  stakingAbi: null,
  tokenAbi: null,
  isTestNet: true,
  chain: testnet.chain,
};

creds = testnet;

// if (
//   isDevServer === "true" ||
//   isDevServer === undefined ||
//   isDevServer === null
// ) {
//   creds = testnet;
// } else {
//   creds = mainnet;
// }

export default creds;
