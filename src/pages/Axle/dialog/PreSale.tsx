import Icon from "../../../assets/home/logos/icon.png";
import { Box, Flex, Image, Input, Text, useToast } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import { ethers } from "ethers";

import axleTokenABI from "../../../abi/AxleToken.json";
import axlePresaleABI from "../../../abi/TokenPresale.json";
import { useEtherBalance, useEthers } from "@usedapp/core";

import Dialog from "./Dialog";
import TransactionSuccessDialog from "./TransactionSuccessDialog";
import { useEffect, useState } from "react";
import NeuButton from "../component/NeuButton";

declare global {
  interface Window {
    ethereum: any;
  }
}

const Tag = (props: any) => {
  return (
    <Flex
      color={theme.primaryTwoTextColor}
      direction={"row"}
      justifyContent="space-between"
      alignItems={"center"}
      columnGap={{ base: "3rem" }}
      fontSize={{ xl: "sm" }}
    >
      <Text>{props.name}</Text>
      <Text>{props.value}</Text>
    </Flex>
  );
};

const PreSale = (props: any) => {
  const [bnb, setBnb] = useState(0);
  const [axle, setAxle] = useState(0);
  const [address, setAddress] = useState<string>("");

  const [balance, setBalance] = useState(0);
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

  window.ethereum.on("accountsChanged", (accounts: any) =>
    window.location.reload()
  );

  const { activateBrowserWallet, isLoading } = useEthers();
  const { chainId } = useEthers();
  const etherBalance = useEtherBalance(address);

  function onBnbChange(e: any) {
    const bnb = Number(e.target.value);
    setBnb(bnb);
    setAxle(bnb * 8000);
  }

  useEffect(() => {
    if (localStorage.getItem("isWalletConnected") === "true") connectWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectWallet = async () => {
    try {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const token = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        axleTokenABI.abi,
        signer
      );
      if (token !== null) {
        const a: number =
          Number(ethers.utils.formatEther(await token.balanceOf(address))) || 0;
        setAddress(address);
        setAxleBalance(a);
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

  const TOKEN_CONTRACT_ADDRESS = "0x9FE1eb84F87d83Ad87A532aD3ce034037039913B";
  const PRESALE_CONTRACT_ADDRESS = "0x39D371fdCaabAAc1a2a052acb2F36c5D19a2cD1f";

  const toast = useToast();

  function buyAxle() {
    (async () => {
      if (address === "") activateBrowserWallet();
      if (chainId !== 97)
        return toast({
          title: "Warning",
          description: "Connect to BSC Testnet, chain id 97",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

      if (bnb < 0.1)
        return toast({
          title: "Warning",
          description: "Minimum 0.1 BNB",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

      if (bnb >= 1.99)
        return toast({
          title: "Warning",
          description: "Maximum 1.99 BNB",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

      const provider = new ethers.providers.Web3Provider(
        window.ethereum as ethers.providers.ExternalProvider
      );
      const signer = provider.getSigner();
      const presale = new ethers.Contract(
        PRESALE_CONTRACT_ADDRESS,
        axlePresaleABI.abi,
        signer
      );
      const options = { value: ethers.utils.parseEther(bnb.toString()) };
      try {
        const { hash } = await presale.deposit(options);
        setHash(hash);
        setSuccess(true);
      } catch (err: any) {
        if (err) {
          const message = err.data.message;
          return toast({
            title: "Error",
            description: message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      }
    })();
  }

  useEffect(() => {
    const b: number = Number(ethers.utils.formatEther(etherBalance || 0));
    setBalance(b);
  }, [address, etherBalance]);

  return (
    <Box px={4} py={8}>
      <Dialog
        close={() => setSuccess(false)}
        children={
          <TransactionSuccessDialog
            hash={hash}
            close={() => setSuccess(false)}
            fee={100}
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
          <Text>Join the AXLE Presale</Text>
          <Text fontWeight={"normal"} fontSize="sm">
            25% of coins on sale. Play,trade & play.
          </Text>
        </Box>
        <Flex direction={"column"}>
          <Tag name="Buy AXLE" value="1 AXLE = $ 0.0034" />
          <Tag name="1 BNB = 8000 AXLE" value="Listing price : $0.015" />
        </Flex>
        {address !== "" ? (
          <Flex textAlign={"center"} direction={"column"}>
            <Text>Connected to</Text>
            <Text fontSize={"sm"}>{address}</Text>
            <Text>Min 0.1 BNB | Max 1.99 BNB</Text>
          </Flex>
        ) : null}
        <Input
          onChange={onBnbChange}
          max={1.99}
          min={0.1}
          type={"number"}
        ></Input>
        <Flex textAlign={"center"} direction="column">
          <Text>
            {bnb} BNB for {axle} AXLE
          </Text>
          <Text>BNB Bal : {!isLoading ? `${balance}` : `...`} </Text>
          <Text>AXLE Bal : {axleBalance} </Text>
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
            onClick={buyAxle}
            label="Buy Axle"
          ></NeuButton>
        )}
      </Flex>
    </Box>
  );
};

export default PreSale;
