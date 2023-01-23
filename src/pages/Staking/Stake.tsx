import { Box, Divider, Image, Input, Text } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";

import Logo from "../../assets/home/logos/logo.png";

import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { ethers } from "ethers";
import { useState, useEffect } from "react";
import creds from "../../main/abi/creds";
import Wallet from "./Wallet";

declare global {
  interface Window {
    ethereum: any;
  }
}

const chainIds = [
  {
    chainId: 1,
    network: "Ethereum Mainnet",
  },
  {
    chainId: 56,
    network: "Binance Smart Chain Mainnet",
  },
  {
    chainId: 137,
    network: "Polygon Mainnet",
  },
  {
    chainId: 42161,
    network: "Arbitrum One",
  },
  {
    chainId: 43114,
    network: "Avalanche C-Chain",
  },
  {
    chainId: 97,
    network: "Binance Smart Chain Testnet",
  },
  {
    chainId: 4,
    network: "Rinkeby",
  },
  {
    chainId: 5,
    network: "Goerli",
  },
];

const TOKEN_CONTRACT_ADDRESS = creds.AXLE_CONTRACT;
const axleTokenABI = creds.tokenAbi;

const web3Modal = new Web3Modal({
  network: "mainnet",
  theme: "dark",
  cacheProvider: false,
  providerOptions: {
    binancechainwallet: {
      package: true,
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: process.env.INFURA_ID, // required
        rpc: {
          56: "https://bsc-dataseed1.binance.org",
        },
        chainId: 56,
      },
    },
    coinbasewallet: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "COINBASE", // Required
        infuraId: process.env.INFURA_ID, // Required
        rpc: {
          56: "https://bsc-dataseed1.binance.org",
        },
        chainId: 56,
      },
    },
  },
});

const stakeRewards = [
  {
    days: 30,
    roi: 14,
  },
  {
    days: 90,
    roi: 17,
  },
  {
    days: 180,
    roi: 20,
  },
  {
    days: 360,
    roi: 25,
  },
];

const Stake = () => {
  const [balance, setBalance] = useState(0);
  const [axleBalance, setAxleBalance] = useState<any>("0");
  const [openWallet, setOpenWallet] = useState(false);
  const [togglePage, setTogglePage] = useState(false);
  const [unstake, setUnstake] = useState(false);

  const [address, setAddress] = useState<string>("");
  const [onChain, setOnChain] = useState("");

  const [bnb, setBnb] = useState<any>("0.2");
  const [axle, setAxle] = useState<any>(15000);

  const onBnbChange = (e: any) => {
    const bnb = Number(e.target.value);
    setBnb(bnb.toString());
    setAxle((bnb * 75000).toString());
  };

  const setNetworkName = (chainId: number) => {
    for (let i = 0; i < chainIds.length; i++) {
      if (chainIds[i].chainId === chainId) {
        setOnChain(chainIds[i].network);
      }
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.utils.hexlify(56) }],
      });
    } catch (err: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Smart Chain",
              chainId: 56,
              nativeCurrency: {
                name: "Smart Chain",
                decimals: 18,
                symbol: "BNB",
              },
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
            },
          ],
        });
      }
    }
  };

  const connectWeb3Wallet = async () => {
    try {
      const web3Provider = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(web3Provider);
      const web3Accounts = await provider.listAccounts();
      setAddress(web3Accounts[0]);
      const network = await provider.getNetwork();
      if (network.chainId !== 56) switchNetwork();
      setNetworkName(network.chainId);
      let bnbBal: any = await provider.getBalance(web3Accounts[0]);
      bnbBal = Number(ethers.utils.formatEther(bnbBal));
      setBalance(bnbBal);
      const signer = provider.getSigner();
      const token = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        axleTokenABI,
        signer
      );
      let bal = await token.balanceOf(web3Accounts[0]);
      bal = ethers.utils.formatEther(bal);
      setAxleBalance(bal);
      localStorage.setItem("isWalletConnected", "true");
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWeb3Modal = async (loaded: boolean = false) => {
    await web3Modal.clearCachedProvider();
    if (!loaded) window.location.reload();
  };

  useEffect(() => {
    console.log(onChain);
    console.log(axle);
    disconnectWeb3Modal(true);
    if (window.ethereum !== null && address !== "") {
      window.ethereum.on("accountsChanged", function (accounts: string) {
        connectWeb3Wallet();
      });
      window.ethereum.on("networkChanged", function (chainId: number) {
        if (chainId !== 56) {
          setTimeout(() => {
            switchNetwork();
            connectWeb3Wallet();
          }, 5000);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      bg={theme.bgColor}
      backgroundImage={`https://axlegames.s3.ap-south-1.amazonaws.com/assets/bg/token_countdown_bg.png`}
      backgroundSize="contain"
      fontFamily={"quicksand"}
      fontWeight="bold"
      my={12}
    >
      <Box
        alignItems={"center"}
        mx={24}
        my={4}
        display={"flex"}
        justifyContent="space-between"
      >
        <Image maxH={"8vh"} src={Logo}></Image>
        <Wallet
          address={address}
          disconnect={disconnectWeb3Modal}
          balance={balance}
          connectWallet={connectWeb3Wallet}
          isLoading={false}
          openWallet={openWallet}
          setOpenWallet={setOpenWallet}
        />
      </Box>
      <Box
        display={"flex"}
        justifyContent="center"
        flexDirection={"column"}
        alignItems="center"
        width={{ base: "100%", md: "90%", lg: "80%", xl: "75%" }}
        mx="auto"
      >
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          flexDirection={"column"}
          width={"32vw"}
        >
          <Box
            boxShadow={`0px 0px 125px -60px ${theme.primaryTextColor}`}
            p={6}
            borderRadius="xl"
            bg={theme.bgColor}
            backgroundImage={`linear-gradient(to bottom, #061e37, #072340, #072849, #082d52, #0a325c)`}
            color={theme.secondaryTextColor}
            fontWeight="bold"
            justifyContent={"center"}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            rowGap={"1rem"}
          >
            <Text fontSize={"3xl"}>Total Value Locked</Text>
            <Divider bg={theme.primaryButtonColor} />
            <Text color={theme.primaryTextColor} fontSize={"xl"}>
              $20000000
            </Text>
            <Divider bg={theme.primaryButtonColor} />
            <Text color={theme.primaryTextColor} fontSize={"sm"}>
              $ 0.00167 = 1 AXLE
            </Text>
          </Box>
          <Box
            mt={4}
            display={"flex"}
            borderRadius={"3xl"}
            justifyContent="space-between"
            fontSize="2xl"
            columnGap=".2rem"
            border={`2px solid ${theme.primaryButtonColor}`}
          >
            <Box
              borderTopLeftRadius={"3xl"}
              borderBottomLeftRadius={"3xl"}
              boxShadow="xl"
              px={8}
              py={4}
              width={"100%"}
              bg={togglePage ? theme.primaryButtonColor : theme.bgColor}
              color={!togglePage ? theme.primaryButtonColor : theme.bgColor}
              textAlign="center"
              onClick={() => setTogglePage(true)}
              cursor="pointer"
            >
              <Text>Flexible</Text>
            </Box>
            <Box
              cursor="pointer"
              color={togglePage ? theme.primaryButtonColor : theme.bgColor}
              boxShadow="xl"
              borderTopRightRadius={"3xl"}
              borderBottomRightRadius={"3xl"}
              px={8}
              py={4}
              width={"100%"}
              bg={!togglePage ? theme.primaryButtonColor : theme.bgColor}
              textAlign="center"
              onClick={() => setTogglePage(false)}
            >
              <Text>Locked</Text>
            </Box>
          </Box>
          {togglePage ? (
            <Box
              color={theme.secondaryTextColor}
              justifyContent="center"
              display={"flex"}
              flexDirection="column"
              my={12}
              alignItems={"center"}
            >
              <Text fontSize={"3xl"} fontWeight="bold">
                FLEXIBLE STAKING
              </Text>
              <Text color={theme.primaryTextColor}> APY: 12% </Text>
              <Text fontSize={"2xl"}> Total $AXLE in Flexible Staking</Text>
              <Text color={theme.primaryTextColor}>597,297,277.293 AXLE</Text>
            </Box>
          ) : (
            <Box
              color={theme.secondaryTextColor}
              justifyContent="center"
              display={"flex"}
              flexDirection="column"
              my={12}
              alignItems={"center"}
            >
              <Text fontSize={"3xl"} fontWeight="bold">
                LOCKED STAKING
              </Text>
              <Text fontSize={"2xl"}> Total $AXLE in Locked Staking</Text>
              <Text color={theme.primaryTextColor}>597,297,277.293 AXLE</Text>
            </Box>
          )}
        </Box>

        {address === "" ? (
          <Box border={`3px solid ${theme.fgColor}`} borderRadius="xl" p={12}>
            <Text my={4} fontSize={"xl"} color={theme.secondaryTwoTextColor}>
              Connect your wallet to stake $AXLE tokens!
            </Text>
            <Box
              onClick={connectWeb3Wallet}
              style={{ textAlign: "center" }}
              className="btn"
            >
              Connect Wallet
            </Box>
          </Box>
        ) : (
          <Box>
            {togglePage ? (
              <Box
                minW={`30vw`}
                borderRadius="xl"
                backdropFilter={`blur(12.3px)`}
                border={`1px solid rgba(24, 28, 26, 1)`}
                color={theme.primaryTextColor}
                boxShadow={`0px 0px 120px -70px ${theme.primaryButtonColor}`}
                p={4}
              >
                <Box
                  textAlign={"center"}
                  display="flex"
                  justifyContent={"space-between"}
                  my={4}
                  border={`2px solid ${theme.primaryButtonColor}`}
                >
                  <Text
                    width={"100%"}
                    boxShadow="xl"
                    fontSize={"2xl"}
                    bg={!unstake ? theme.primaryButtonColor : theme.bgColor}
                    color={unstake ? theme.primaryButtonColor : theme.bgColor}
                    cursor="pointer"
                    onClick={() => setUnstake(false)}
                  >
                    STAKE AXLE
                  </Text>
                  <Text
                    boxShadow="xl"
                    color={!unstake ? theme.primaryButtonColor : theme.bgColor}
                    onClick={() => setUnstake(true)}
                    cursor="pointer"
                    width={"100%"}
                    fontSize={"2xl"}
                    bg={unstake ? theme.primaryButtonColor : theme.bgColor}
                  >
                    UNSTAKE AXLE
                  </Text>
                </Box>
                {!unstake ? (
                  <Box>
                    <Box
                      color={theme.secondaryTextColor}
                      display={"flex"}
                      px={8}
                      py={2}
                      justifyContent="space-between"
                    >
                      <Text>Amout</Text>
                      <Text>~My Balance {axleBalance} AXLE</Text>
                    </Box>
                    <Box
                      height={"100%"}
                      width="100%"
                      px={4}
                      alignItems={"center"}
                      display={"flex"}
                      border={`3px solid ${theme.fgColor}`}
                      borderRadius="xl"
                    >
                      <Box>$AXLE</Box>
                      <Input
                        mx={4}
                        fontWeight={"bold"}
                        color={theme.primaryButtonColor}
                        placeholder="value (BNB)"
                        onChange={onBnbChange}
                        fontSize="lg"
                        type={"number"}
                        inputMode="decimal"
                        borderRadius={"none"}
                        textAlign="right"
                        value={bnb}
                        borderLeft={`2px solid ${theme.fgColor}`}
                        borderRight={`2px solid ${theme.fgColor}`}
                        min={0.2}
                        max={50}
                        _active={{
                          outline: "none",
                          shadow: "none",
                        }}
                        _hover={{
                          outline: "none",
                          shadow: "none",
                        }}
                        _focus={{
                          outline: "none",
                          shadow: "none",
                        }}
                      ></Input>
                      <Box cursor={"pointer"}>MAX</Box>
                    </Box>
                    <Box px={2} color={theme.secondaryTextColor}>
                      Min Stake Amount : 8000 AXLE
                    </Box>

                    <Box mt={4} textAlign={"center"} className="btn">
                      Enable Staking
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box
                      color={theme.secondaryTextColor}
                      display={"flex"}
                      px={8}
                      py={2}
                      justifyContent="space-between"
                    >
                      <Text>Amout</Text>
                      <Text>~My Balance {axleBalance} AXLE</Text>
                    </Box>
                    <Box
                      height={"100%"}
                      width="100%"
                      px={4}
                      alignItems={"center"}
                      display={"flex"}
                      border={`3px solid ${theme.fgColor}`}
                      borderRadius="xl"
                    >
                      <Box>$AXLE</Box>
                      <Input
                        mx={4}
                        fontWeight={"bold"}
                        color={theme.primaryButtonColor}
                        placeholder="value (BNB)"
                        onChange={onBnbChange}
                        fontSize="lg"
                        type={"number"}
                        inputMode="decimal"
                        borderRadius={"none"}
                        textAlign="right"
                        value={bnb}
                        borderLeft={`2px solid ${theme.fgColor}`}
                        borderRight={`2px solid ${theme.fgColor}`}
                        min={0.2}
                        max={50}
                        _active={{
                          outline: "none",
                          shadow: "none",
                        }}
                        _hover={{
                          outline: "none",
                          shadow: "none",
                        }}
                        _focus={{
                          outline: "none",
                          shadow: "none",
                        }}
                      ></Input>
                      <Box cursor={"pointer"}>MAX</Box>
                    </Box>
                    <Box mt={4} textAlign={"center"} className="btn">
                      Unstake AXLE
                    </Box>
                  </Box>
                )}
              </Box>
            ) : (
              <Box
                minW={`30vw`}
                borderRadius="xl"
                backdropFilter={`blur(12.3px)`}
                border={`1px solid rgba(24, 28, 26, 1)`}
                color={theme.primaryTextColor}
                boxShadow={`0px 0px 120px -70px ${theme.primaryButtonColor}`}
                p={4}
              >
                <Box textAlign={"center"}>
                  <Text fontSize={"3xl"}>STAKE AXLE</Text>
                </Box>
                <Divider bg={theme.primaryButtonColor} my={2} />
                <Box
                  color={theme.secondaryTextColor}
                  display={"flex"}
                  px={8}
                  py={2}
                  justifyContent="space-between"
                >
                  <Text>Amout</Text>
                  <Text>~My Balance {axleBalance} AXLE</Text>
                </Box>
                <Box
                  height={"100%"}
                  width="100%"
                  px={4}
                  alignItems={"center"}
                  display={"flex"}
                  border={`3px solid ${theme.fgColor}`}
                  borderRadius="xl"
                >
                  <Box>$AXLE</Box>
                  <Input
                    mx={4}
                    fontWeight={"bold"}
                    color={theme.primaryButtonColor}
                    placeholder="value (BNB)"
                    onChange={onBnbChange}
                    fontSize="lg"
                    type={"number"}
                    inputMode="decimal"
                    borderRadius={"none"}
                    textAlign="right"
                    value={bnb}
                    borderLeft={`2px solid ${theme.fgColor}`}
                    borderRight={`2px solid ${theme.fgColor}`}
                    min={0.2}
                    max={50}
                    _active={{
                      outline: "none",
                      shadow: "none",
                    }}
                    _hover={{
                      outline: "none",
                      shadow: "none",
                    }}
                    _focus={{
                      outline: "none",
                      shadow: "none",
                    }}
                  ></Input>
                  <Box cursor={"pointer"}>MAX</Box>
                </Box>
                <Box color={theme.secondaryTextColor} my={4} px={8}>
                  Locking
                </Box>
                <Box
                  display={"flex"}
                  justifyContent="center"
                  columnGap={"1rem"}
                  alignItems={"center"}
                  my={8}
                >
                  {stakeRewards.map((s, i) => (
                    <Box
                      borderRadius={"xl"}
                      p={2}
                      bg={theme.bgColor}
                      boxShadow={`1px 1px 3px ${theme.primaryTextColor}`}
                      textAlign={"center"}
                      key={i}
                      px={3}
                      minW={"32"}
                      cursor="pointer"
                    >
                      <Text color={theme.secondaryTextColor} fontSize={"lg"}>
                        {" "}
                        {s.days} Days{" "}
                      </Text>
                      <Divider my={2} />
                      <Text color={theme.secondaryTwoTextColor} fontSize={"xl"}>
                        {" "}
                        {s.roi}%
                      </Text>
                    </Box>
                  ))}
                </Box>
                <Box textAlign={"center"} className="btn">
                  Enable Staking
                </Box>
                <Box textAlign={"center"}>
                  <Divider bg={theme.primaryTextColor} my={4} />
                  <Text>Locking 12002 AXLE for 180 Days</Text>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Stake;
