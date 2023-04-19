import { useState } from "react";
import { Box } from "@chakra-ui/react";

import AXLE from "../../../assets/home/logos/icon.png";
import Trophy from "../../../assets/logos/trophy.webp";

import WalletCard from "./WalletCard";
import Dialog from "../../Axle/dialog/AxleDialog";

import SwapAxleForAxCoinDialog from "../../Axle/dialog/SwapAxleForAxCoinDialog";
import SwapAxCoinForAxle from "../../Axle/dialog/SwapAxCoinForAxle";

interface WalletProps {
  balance: number;
}

const WalletHeader = (props: WalletProps) => {
  const [axle, setAxle] = useState(false);
  const [ax, setAx] = useState(false);

  return (
    <Box
      display={"grid"}
      columnGap="1rem"
      rowGap={"1rem"}
      justifyContent={"center"}
      p={4}
      borderRadius="xl"
      gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
    >
      <Dialog
        isOpen={ax}
        close={() => setAx(false)}
        children={<SwapAxleForAxCoinDialog balance={props.balance} />}
        size={"lg"}
      />
      <Dialog
        isOpen={axle}
        close={() => setAxle(false)}
        children={<SwapAxCoinForAxle balance={props.balance} />}
        size={"lg"}
      />

      <WalletCard
        amount={""}
        handleAmount={() => {}}
        form={false}
        action={() => setAxle(true)}
        img={Trophy}
        label="Swap AXCoin for AXLE"
        main="Wallet Balance"
        sub={`${props.balance} AXCoins`}
      />
      <WalletCard
        form={false}
        amount={""}
        handleAmount={() => {}}
        action={() => setAx(true)}
        img={AXLE}
        label="Swap AXLE for AXCoin"
        main="Connected Wallet Balance"
        sub="1 AXCoin = 1 AXLE"
      />
    </Box>
  );
};

export default WalletHeader;
