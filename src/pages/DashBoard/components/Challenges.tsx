import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { theme } from "../../../config/theme.config";
import { Box, Button, Flex, Text, Toast } from "@chakra-ui/react";
import {
  ChallengeServices,
  Challenges,
  Challenge,
  ChallengeStatus,
} from "../ChallengerServices";

import creds from "../../../abi/creds";

import Web3Modal from "web3modal";
import AuthDialog from "../../Auth/dialogs/AuthDialog";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import ChallengeModal from "./ChallengesModal";
import Status from "./Status";
import {
  EntryStatus,
  ENTRY_STATUS,
  GameServices,
} from "../../Games/GameServices";
import { TokenAuthStatus } from "../../../config/auth";
import { GameType } from "../../Home/enums/contests.enum";
import { useNavigate } from "react-router";

export enum ResponseType {
  USER_NOT_FOUND = "USER_NOT_FOUND",
  CHALLENGE_NOT_FOUND = "CHALLENGE_NOT_FOUND",
  WALLET_NOT_FOUND = "WALLET_NOT_FOUND",
  IN_SUFFICENT_FUNDS = "IN_SUFFICENT_FUNDS",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  OK = "OK",
  ALREADY_IN_CHALLENGE = "ALREADY_IN_CHALLENGE",
}

const TOKEN_CONTRACT_ADDRESS = creds.AXLE_CONTRACT;
const axleTokenABI = creds.tokenAbi;
const chain = creds.chain;

const web3Modal = new Web3Modal({
  network: "testnet",
  theme: "dark",
  providerOptions: {
    binancechainwallet: {
      package: true,
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "", // required
        rpc: {
          56: chain.rpcUrls[0],
        },
        chainId: chain.chainId,
      },
    },
    coinbasewallet: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "COINBASE", // Required
        infuraId: "", // Required
        rpc: {
          56: chain.rpcUrls,
        },
        chainId: chain.chainId,
      },
    },
  },
});

declare global {
  interface Window {
    ethereum: any;
  }
}

const ChallengesC = () => {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState(false);
  const [statusDialog, setStatusDialog] = useState(false);
  const [challenge, setChallenge] = useState<Challenge>({
    _id: "",
    challengeType: "",
    createdAt: "",
    entryFee: 0,
    game: "",
    pool: 0,
    task: {
      _id: "",
      axleContests: [],
      createdAt: "",
      task: "",
      completeIn: 0,
      gameWins: 0,
      invites: 0,
      noOfChances: 0,
      profileCompletion: 0,
    },
    isIn: false,
  });
  const [challenges, setChallenges] = useState<Challenges>();
  const [errorDialog, setErrorDialog] = useState(false);
  const [header, setHeader] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<ChallengeStatus[]>([]);

  useEffect(() => {
    ChallengeServices.getChallenges()
      .then((challenges) => {
        setChallenges(challenges);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getChallengeStatus = (challengeId: string) => {
    ChallengeServices.getChallengerStats(challengeId)
      .then((res) => {
        setStatus(res);
        setStatusDialog(true);
      })
      .catch((err) => console.log(err));
  };

  const play = (contestId: string, link: string) => {
    return GameServices.enterContest({
      contestId: contestId,
      userId: localStorage.getItem("userId"),
      confirm: true,
    })
      .then((res) => handleEntryStatus(res, link))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEntryStatus = (
    res: EntryStatus | TokenAuthStatus,
    link: string
  ) => {
    // isAuthorized(res as TokenAuthStatus);
    res = res as EntryStatus;
    console.log(res);
    const status = res.status.valueOf().toString();
    const toString = (entryStatus: ENTRY_STATUS): string => {
      return entryStatus.valueOf().toString();
    };
    if (status === toString(ENTRY_STATUS.ALREADY_IN_OTHER_GAME)) {
      const type = res.type === GameType.PRACTICE ? "practice" : "contest";
      setHeader("Oops!");
      setMessage(
        `Your are already playing ${res.name} ${type} game, please finish it and come back`
      );
      return setErrorDialog(true);
    }
    if (
      status === toString(ENTRY_STATUS.ALREADY_PARTICIPATED_IN_THIS_CONTEST)
    ) {
      setHeader("Oops!!");
      setMessage(
        "You already participated in this contest, try another contest"
      );
      return setErrorDialog(true);
    }
    if (status === toString(ENTRY_STATUS.CONTEST_DOESNOT_EXIST)) {
      setHeader("Oops!!");
      setMessage("Invalid entry, contest does not exist");
      return setErrorDialog(true);
    }
    if (status === toString(ENTRY_STATUS.IN_SUFFICENT_FUNDS)) {
      setHeader("Insufficent Funds");
      setMessage("Please, add some funds to wallet, for entering into game");
      return setErrorDialog(true);
    }
    if (status === toString(ENTRY_STATUS.WALLET_DOESTNOT_EXIST)) {
      setHeader("Unauthorized Access");
      setMessage("Oops! unauthorized access, please retry again");
      return setErrorDialog(true);
    }
    if (
      status === toString(ENTRY_STATUS.ALREADY_IN_GAME) ||
      status === toString(ENTRY_STATUS.ENTER_CONTEST)
    ) {
      const gameStateId = res.gameState._id;
      const contestId = res.gameState.axleContest;
      setErrorDialog(false);
      return navigate(`/${link}/lobby/${contestId}/${gameStateId}`);
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.utils.hexlify(chain.chainId) }],
      });
    } catch (err: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: chain.chainName,
              chainId: chain.chainId,
              nativeCurrency: {
                name: chain.nativeCurrency.name,
                decimals: chain.nativeCurrency.decimals,
                symbol: chain.nativeCurrency.symbol,
              },
              rpcUrls: chain.rpcUrls,
            },
          ],
        });
      }
    }
  };

  const enterChallengeContract = async () => {
    try {
      const web3Provider = await web3Modal.connect();
      console.log(web3Provider);
      const provider = new ethers.providers.Web3Provider(web3Provider);
      console.log(provider);
      const network = await provider.getNetwork();
      if (network.chainId !== chain.chainId) switchNetwork();
      const signer = provider.getSigner();
      const token = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        axleTokenABI,
        signer
      );
      let c = challenge.entryFee / 10 ** 9;
      const hash = await token.transfer(
        "0x46D3099487DDcf724df70ed11b40109dAb586F79",
        ethers.utils.parseEther(c.toString())
      );
      if (hash) {
        const user = localStorage.getItem("userId");
        if (user) {
          return ChallengeServices.enterChallenge(challenge._id)
            .then((res) => handleEnterChallenge(res))
            .catch((err) => {
              console.log(err);
            });
        }
      }
    } catch (err: any) {
      let message = err;
      try {
        if (err?.code === "NETWORK_ERROR") {
          message = "Please switch the network, to BSC Mainnet";
        }
        if (err?.data.method === "eth_estimateGas") {
          message = err.message;
        }
        if (err?.data.code === -32000) {
          message = err.data.message;
        }
      } catch (error) {
        console.log(error);
      }
      return Toast({
        title: "Error",
        description: String(message),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleEnterChallenge = (res: any) => {
    // isAuthorized(res as TokenAuthStatus);
    const status = res.status.valueOf().toString();
    console.log(status);
    const toString = (entryStatus: ResponseType): string => {
      return entryStatus.valueOf().toString();
    };

    if (status === toString(ResponseType.OK)) {
      setHeader("Enrolled to challenge");
      setMessage("Please, check challenges tab, for more details");
      return setErrorDialog(true);
    }
    if (status === toString(ResponseType.ALREADY_IN_CHALLENGE)) {
      setHeader("Oops!");
      setMessage(`Your are already enrolled for this challenge.`);
      return setErrorDialog(true);
    }
    if (status === toString(ResponseType.IN_SUFFICENT_FUNDS)) {
      setHeader("Insufficent Funds");
      setMessage("Please, add some funds to wallet, for entering into game");
      return setErrorDialog(true);
    }
    if (
      status ===
      toString(
        ResponseType.WALLET_NOT_FOUND ||
          ResponseType.CHALLENGE_NOT_FOUND ||
          ResponseType.USER_NOT_FOUND ||
          ResponseType.INTERNAL_SERVER_ERROR
      )
    ) {
      setHeader("Unauthorized Access");
      setMessage("Oops! unauthorized access, please retry again");
      return setErrorDialog(true);
    }
  };

  return (
    <Flex
      bg={theme.bgColor}
      p={4}
      rowGap="1rem"
      borderRadius="xl"
      direction={"column"}
    >
      <AuthDialog
        children={
          <>
            <Box>{header}</Box>
            <Box>{message}</Box>
          </>
        }
        close={() => setErrorDialog(false)}
        isOpen={errorDialog}
        size="lg"
      />
      <AuthDialog
        children={<Status play={play} challenges={status} />}
        close={() => setStatusDialog(false)}
        isOpen={statusDialog}
        size="6xl"
      />
      <ChallengeModal
        children={""}
        enter={() => enterChallengeContract()}
        close={() => setDialog(false)}
        isOpen={dialog}
        size="lg"
        key={1}
        challenge={challenge}
      />
      <Text
        px={4}
        fontWeight={"bold"}
        fontSize={"3xl"}
        color={theme.primaryTextColor}
      >
        Complete & Earn
      </Text>
      {challenges?.challenges.map((t, i) => (
        <Box
          borderRadius="lg"
          boxShadow={`-2px 2px 1px ${theme.primaryTwoTextColor}`}
          key={i}
        >
          <Flex
            fontWeight={"bold"}
            alignItems="center"
            gridColumnGap={"1rem"}
            rowGap="1rem"
            justifyContent="space-between"
            px={4}
            py={2}
          >
            <Box width={"100%"}>
              <Text color={theme.primaryTextColor}>{t.task.task}</Text>
            </Box>
            {t.isIn ? (
              <Button
                transition={"200ms all ease-in"}
                bg={theme.fgColor}
                color={theme.primaryTextColor}
                _hover={{
                  outline: theme.primaryTextColor,
                  border: `1px solid ${theme.primaryTextColor}`,
                }}
                outline="none"
                border={`2px solid ${theme.primaryTextColor}`}
                boxShadow="md"
                fontWeight={"bold"}
                variant={"outline"}
                onClick={() => {
                  setChallenge(t);
                  getChallengeStatus(t._id);
                }}
              >
                View More
              </Button>
            ) : (
              <Button
                transition={"200ms all ease-in"}
                bg={theme.fgColor}
                color={theme.primaryTextColor}
                _hover={{
                  outline: theme.primaryTextColor,
                  border: `1px solid ${theme.primaryTextColor}`,
                }}
                outline="none"
                border={`2px solid ${theme.primaryTextColor}`}
                boxShadow="md"
                fontWeight={"bold"}
                variant={"outline"}
                animation={"celebrate_blinker 1.5s infinite"}
                onClick={() => {
                  setChallenge(t);
                  setDialog(true);
                }}
              >
                Enter
              </Button>
            )}
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default ChallengesC;
