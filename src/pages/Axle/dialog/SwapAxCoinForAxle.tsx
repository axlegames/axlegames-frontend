import Icon from "../../../assets/home/logos/icon.png";
import { Box, Flex, Image, Input, Text, useToast } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import { ethers } from "ethers";

import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { useEthers } from "@usedapp/core";

import AxleDialog from "./AxleDialog";
import TransactionSuccessDialog from "./TransactionSuccessDialog";
import { useEffect, useState } from "react";
import NeuButton from "../component/NeuButton";
import { PaymentStatus, WalletServices } from "../../Wallet/WalletServices";
import env from "react-dotenv";

import TokenAbiTestnet from "../../../abi/testnet/AxleTokenTest.json";

const TOKEN_CONTRACT_ADDRESS = "0x3b12b9ec6a9f1514809eed63597c13ff6146aa08";
const axleTokenABI = TokenAbiTestnet;
const chain = {
  chainName: "BSC Testnet",
  chainId: 97,
  nativeCurrency: {
    name: "BSC Testnet",
    decimals: 18,
    symbol: "BNB",
  },
  rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545"],
};

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

const Tag = (props: any) => {
  return (
    <Flex
      color={theme.primaryTextColor}
      direction={"row"}
      justifyContent="space-between"
      alignItems={"center"}
      columnGap={{ base: "2rem" }}
      fontSize={{ xl: "md" }}
    >
      <Text>{props.name}</Text>
      <Text>{props.value}</Text>
    </Flex>
  );
};

const SwapAxleForAxCoinDialog = (props: any) => {
  const [ax, setAX] = useState(0);
  const [axle, setAxle] = useState(0);
  const [address, setAddress] = useState<string>("");

  const [axleBalance, setAxleBalance] = useState(0);

  const [success, setSuccess] = useState(false);
  const [hash, setHash] = useState<string>("");

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  provider.on("network", (newNetwork, oldNetwork) => {
    // When a Provider makes its initial connection, it emits a "network"
    // event with a null oldNetwork along with the newNetwork. So, if the
    // oldNetwork exists, it represents a changing network
    if (oldNetwork) {
      window.location.reload();
    }
  });

  const { isLoading } = useEthers();

  function onAXLEChange(e: any) {
    const axleB = Number(e.target.value);
    setAX(axleB);
    setAxle(axleB);
  }

  useEffect(() => {
    const isWalletConnected = localStorage.getItem("isWalletConnected");
    if (isWalletConnected === "true") connectWallet();
    window.ethereum.on("accountsChanged", (accounts: any) => {
      if (accounts[0] !== address) connectWallet();
      if (accounts.length === 0 || accounts[0] === "") {
        localStorage.removeItem("isWalletConnected");
        window.location.reload();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectWallet = async () => {
    try {
      const signer = provider.getSigner();
      if (signer._address === null) {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
      }
      const address = await signer.getAddress();
      const token = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        axleTokenABI,
        signer
      );
      if (token !== null) {
        const a: number =
          Number(ethers.utils.formatEther(await token.balanceOf(address))) || 0;
        setAddress(address);
        setAxleBalance(a * 10 ** 9);
        localStorage.setItem("isWalletConnected", "true");
      }
    } catch (error: any) {
      window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x61",
            rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
            chainName: "BSC Testnet",
            nativeCurrency: {
              symbol: "BNB",
              decimals: 18,
            },
            blockExplorerUrls: ["https://testnet.bscscan.com/"],
          },
        ],
      });
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

  const toast = useToast();

  const swapAxCoinForAxle = async () => {
    try {
      const web3Provider = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(web3Provider);
      const signer = new ethers.Wallet(env.mpk, provider);

      const network = await provider.getNetwork();
      if (network.chainId !== chain.chainId) switchNetwork();
      const token = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        axleTokenABI,
        signer
      );
      let c: any = axle / 10 ** 9;
      c = ethers.utils.parseEther(c.toString());
      const hash = await token.transfer(address, c);
      if (hash) updateWallet();
      setHash(hash.hash);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateWallet = async () => {
    try {
      await WalletServices.depositTokens({
        tt: "DEDUCT",
        amount: ax,
        hash: hash,
        userId: localStorage.getItem("userId") || "",
      })
        .then((res) => {
          if (res === PaymentStatus.SUCCESS) {
            setTimeout(() => {
              window.location.reload();
            }, 5000);
            return toast({
              title: "Payment Successful",
              description: "AxCoins Deposited into your account",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          }
          return toast({
            title: "Payment Unsuccessful",
            description: "something went wrong",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        })
        .catch((err) => {
          return toast({
            title: "Payment Unsuccessful",
            description: err,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box px={4} py={8}>
      <AxleDialog
        close={() => setSuccess(false)}
        children={
          <TransactionSuccessDialog
            hash={hash}
            close={() => setSuccess(false)}
            fee={axle}
          />
        }
        isOpen={success}
        key={2}
        size={"lg"}
      />
      <Flex
        display={success ? "none" : "flex"}
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
        rowGap="1rem"
      >
        <Image p={8} src={Icon} />
        <Box textAlign={"center"}>
          <Text fontWeight={"bold"} fontSize="xl">
            Join the AXLE Presale
          </Text>
        </Box>
        <Flex direction={"column"}>
          <Text
            fontWeight={"bold"}
            align="center"
            color={theme.primaryTextColor}
            fontSize="md"
          >
            1 AXCoin = 1 AXLE
          </Text>
          <Tag name="Min = 500 AXLE" value="Max = 10000 AXLE" />
        </Flex>
        {address !== "" ? (
          <Flex textAlign={"center"} direction={"column"}>
            <Text>Connected to</Text>
            <Text fontSize={"sm"} color={theme.primaryTwoTextColor}>
              {address}
            </Text>
          </Flex>
        ) : null}
        <Input
          placeholder="value (AXLE)"
          onChange={onAXLEChange}
          max={1.99}
          min={0.1}
          type={"number"}
        ></Input>
        <Flex textAlign={"center"} direction="column">
          <Flex
            textAlign={"center"}
            direction="row"
            color={theme.highLightColor}
          >
            <Text fontSize={"md"}>AXCoins: </Text>
            <Text>&nbsp; </Text>
            <Text color={theme.highLightColor}>
              {!isLoading ? `${props.balance}` : `...`}
            </Text>
            <Text>&nbsp; </Text>
            <Text> | AXLE Bal : </Text>
            <Text>&nbsp; </Text>
            <Text color={theme.highLightColor}> {axleBalance} </Text>
          </Flex>
          <Box mt={3}></Box>
          <Text fontSize={"md"} color={theme.primaryTextColor}>
            You receive {axle} AXCoins
          </Text>
        </Flex>
        {address === "" ? (
          <NeuButton
            bg={"#A34400"}
            shadow={"#FF7C1F"}
            onClick={connectWallet}
            label="Connect Wallet"
          ></NeuButton>
        ) : (
          <NeuButton
            bg={"#A34400"}
            shadow={"#FF7C1F"}
            onClick={swapAxCoinForAxle}
            label="Swap AXCoins"
          ></NeuButton>
        )}
      </Flex>
    </Box>
  );
};

export default SwapAxleForAxCoinDialog;
