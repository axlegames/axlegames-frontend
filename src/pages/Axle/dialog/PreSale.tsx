import { useEffect, useState } from "react";
import Icon from "../../../assets/home/logos/icon.png";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import { ethers } from "ethers";

import axleTokenABI from "../../../abi/AxleToken.json";
import axlePresaleABI from "../../../abi/TokenPresale.json";
import { useEtherBalance, useEthers } from "@usedapp/core";

declare global {
  interface Window {
    ethereum: import("ethers").providers.ExternalProvider;
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
  // const [state, setState] = useState({
  //   blockHash: "",
  //   blockNumber: "",
  //   transactionHash: "",
  // });

  const { activateBrowserWallet, isLoading } = useEthers();
  const { chainId } = useEthers();
  const etherBalance = useEtherBalance(address);

  function onBnbChange(e: any) {
    const bnb = Number(e.target.value);
    setBnb(bnb);
    setAxle(bnb * 0.12);
  }

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    window.ethereum.sendAsync!(
      { method: "eth_requestAccounts", params: [] },
      async (cb, err) => {
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const token = new ethers.Contract(
          TOKEN_CONTRACT_ADDRESS,
          axleTokenABI.abi,
          signer
        );
        if (token !== null) {
          const a: number =
            Number(ethers.utils.formatEther(await token.balanceOf(address))) ||
            0;
          setAddress(address);
          setAxleBalance(a);
        }
      }
    );
  };

  const TOKEN_CONTRACT_ADDRESS = "0x9FE1eb84F87d83Ad87A532aD3ce034037039913B";
  const PRESALE_CONTRACT_ADDRESS = "0x39D371fdCaabAAc1a2a052acb2F36c5D19a2cD1f";

  const toast = useToast();

  function preSale() {
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

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const presale = new ethers.Contract(
        PRESALE_CONTRACT_ADDRESS,
        axlePresaleABI.abi,
        signer
      );
      const options = { value: ethers.utils.parseEther(bnb.toString()) };
      try {
        const p = await presale.deposit(options);
        console.log(p);
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
      <Flex
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
          <Flex direction={"column"}>
            <Text>Connected to {address}</Text>
            <Text>BNB Bal : {!isLoading ? `${balance}` : `...`} </Text>
            <Text>AXLE Bal : {axleBalance} </Text>
          </Flex>
        ) : null}
        <Input
          onChange={onBnbChange}
          max={1.99}
          min={0.1}
          type={"number"}
        ></Input>
        <Flex direction="column">
          <Text>
            {bnb} BNB for {axle} AXLE
          </Text>
          <Text></Text>
        </Flex>
        <Text>Min 0.1 BNB | Max 1.99 BNB</Text>
        {address === "" ? (
          <Button
            onClick={connectWallet}
            color={"black"}
            bg={theme.primaryButtonColor}
          >
            Connect Wallet & Buy
          </Button>
        ) : (
          <Button
            onClick={preSale}
            color={"black"}
            bg={theme.primaryButtonColor}
          >
            Buy now
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default PreSale;

// ref for success transction
// const d = {
//   hash: "0x5f1ffcaba99fa7a26602caf58e960fd6a2e11ae595ce6cefe90c23fcaf930497",
//   type: 0,
//   accessList: null,
//   blockHash: null,
//   blockNumber: null,
//   transactionIndex: null,
//   confirmations: 0,
//   from: "0x9423165E2390e5A543a6441432Bf7F9327Ef2E8A",
//   gasPrice: {
//     type: "BigNumber",
//     hex: "0x02540be400",
//   },
//   gasLimit: {
//     type: "BigNumber",
//     hex: "0x0100f4",
//   },
//   to: "0x39D371fdCaabAAc1a2a052acb2F36c5D19a2cD1f",
//   value: {
//     type: "BigNumber",
//     hex: "0x016345785d8a0000",
//   },
//   nonce: 34,
//   data: "0xd0e30db0",
//   r: "0x2ca805aa0041c434e2a440fc9d2b182120bab7e9408799a2461a3c1221220cc8",
//   s: "0x17b898de137eb52535a2d56f251bfa32543b1fa9b9a7ac0d67cc900c9c9ebb68",
//   v: 229,
//   creates: null,
//   chainId: 97,
// };
