import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

import AXLE from "../../../assets/home/logos/icon.png";
import Trophy from "../../../assets/logos/trophy.webp";

import NeuButton from "../../Axle/component/NeuButton";
import PreSale from "../../Axle/dialog/PreSale";
import { useState } from "react";
import Dialog from "../../Axle/dialog/Dialog";

interface Props {
  img: string;
  main: string;
  sub: string;
  action: Function;
  label: string;
}

interface WalletProps {
  balance: number;
}

const WalletHeader = (props: WalletProps) => {
  const [open, setOpen] = useState(false);

  const WalletCard = (props: Props) => {
    return (
      <Box
        display={"flex"}
        flexDirection="column"
        bg={theme.bgColor}
        p={4}
        borderRadius="xl"
        alignItems={"center"}
        rowGap={"1rem"}
        minW="14vw"
      >
        <Image width={"20"} height="20" src={props.img} />
        <Box>
          <Text
            textAlign={"center"}
            color={theme.secondaryTextColor}
            fontSize="lg"
          >
            {props.main}
          </Text>
          <Text
            textAlign={"center"}
            color={theme.secondaryTwoTextColor}
            fontSize="xl"
          >
            {props.sub}
          </Text>
        </Box>
        <Flex columnGap={"1rem"}>
          <NeuButton
            onClick={() => props.action}
            label={props.label}
            bg={"#A34400"}
            shadow={"#FF7C1F"}
          />
        </Flex>
      </Box>
    );
  };
  return (
    <Box
      display={"flex"}
      columnGap="1rem"
      justifyContent={"center"}
      p={4}
      borderRadius="xl"
    >
      <Dialog
        close={() => setOpen(false)}
        children={<PreSale />}
        isOpen={open}
        key={1}
        size={"lg"}
      />

      <WalletCard
        action={() => {
          setOpen(true);
          console.log("Ok");
        }}
        img={Trophy}
        label="Add Funds"
        main="Wallet Balance"
        sub={`${props.balance} AXLE`}
      />
      <WalletCard
        action={() => {
          setOpen(true);
          console.log("not Ok");
        }}
        img={AXLE}
        label="Buy in Presale Token"
        main="Connected Wallet Balance"
        sub="00.00 AXLE"
      />
    </Box>
  );
};

export default WalletHeader;
