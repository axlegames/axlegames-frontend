import { useEffect, useState } from "react";
import Icon from "../../../assets/home/logos/icon.png";
import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import { ethers } from "ethers";

import axleTokenABI from "../../../abi/AxleToken.json";

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
  const [gasFees, setGasFees] = useState(2100000);
  // const [state, setState] = useState({
  //   blockHash: "",
  //   blockNumber: "",
  //   transactionHash: "",
  // });
  console.log(gasFees);

  function onBnbChange(e: any) {
    const bnb = Number(e.target.value);
    setBnb(bnb);
    setAxle(bnb * 0.12);
  }

  function preSale() {
    (async () => {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      // const address = await signer.getAddress();
      // const token = new ethers.Contract(
      //   "0x8eFe412d87dA0D4893762ddC4d958452b109d7D8",
      //   axleTokenABI.abi,
      //   signer
      // );
      // await token.approve(address, (bnb * 10 ** 18).toString(), {
      //   gasLimit: 210000,
      // });
      // console.log(swap);
      // const p = await swap.presaleEther();
      // console.log(ethers.utils.formatEther(p));
      // const presale = await swap.preSale(address);
      // console.log(presale);
    })();
  }

  async function initContracts() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const token = new ethers.Contract(
      "0x8eFe412d87dA0D4893762ddC4d958452b109d7D8",
      axleTokenABI.abi,
      signer
    );
    if (token !== null) {
      let balance = await token.balanceOf(address);
      balance = ethers.utils.formatEther(balance);
      setAddress(address);
      setBalance(balance);
      setGasFees(1000000);
    }
  }

  useEffect(() => {
    initContracts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Tag name="1 BNB = 80,000 AXLE" value="Listing price : $0.015" />
        </Flex>
        <Flex direction={"column"}>
          <Text>Connected to {address}</Text>
          <Text>Bal : {balance} BNB </Text>
        </Flex>
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
        <Button onClick={preSale} color={"black"} bg={theme.primaryButtonColor}>
          Buy now
        </Button>
      </Flex>
    </Box>
  );
};

export default PreSale;
