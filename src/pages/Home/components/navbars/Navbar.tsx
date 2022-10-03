import { theme } from "../../../../config/theme.config";
import { useState } from "react";
import { Box, Text, Button, Grid, GridItem } from "@chakra-ui/react";

import { AiOutlineUser } from "react-icons/ai/index";
import IsLoggedIn from "../../../../config/isLoggedIn";

import Dialog from "../../../Auth/Dialog";
import Wallets from "../../../Auth/Wallets";
import UserDropDown from "./UserDropDown";

import { NearConnectionServices } from "./NearConnection";

import WalletDetails from "./WalletDetails";
import NEAR from "../../../../assets/logos/NEAR.svg";

interface Props {
  account: string;
  balance: string;
  isConnected: boolean;
}

const Navbar = () => {
  const [walletsModal, setWalletsModel] = useState(false);
  const [user, setUser] = useState<Props>({
    account: "",
    balance: "",
    isConnected: false,
  });
  const [wallet, setWallet] = useState<any>({});
  const [openDropDown, setOpenDropDown] = useState(false);

  const connectToNEAR = async () => {
    const wallet = await NearConnectionServices.connectWallet();
    setUser({
      account: await wallet.getAccountId(),
      balance: (await wallet.account().state()).amount,
      isConnected: true,
    });
    setWallet(wallet);
    setWalletsModel(false);
  };

  const disconnect = async () => {
    wallet.signOut();
    setWallet({});
    setUser({
      account: "",
      balance: "",
      isConnected: false,
    });
    setWalletsModel(false);
  };

  return (
    <Grid
      position={"relative"}
      bg={theme.fgColor}
      color={theme.bgColor}
      fontFamily="quicksand"
      fontWeight={"bold"}
      alignItems="center"
      columnGap="1rem"
      display={{ base: "none", lg: "flex" }}
      gridTemplateColumns={"repeat(2, 1fr)"}
      p={4}
    >
      <Dialog
        children={
          <Wallets
            isConnected={user.isConnected}
            disconnect={disconnect}
            address={user.account}
            connectToNEAR={() => connectToNEAR()}
          />
        }
        isOpen={walletsModal}
        close={() => setWalletsModel(false)}
      />
      <GridItem
        width={"100%"}
        justifyContent={"flex-end"}
        columnGap={"1rem"}
        display={"flex"}
        flexDirection="row"
      >
        {!user.isConnected ? (
          <Button
            _hover={{
              color: theme.primaryColor,
              bg: theme.bgColor,
            }}
            zIndex={2000}
            onClick={() => setWalletsModel(true)}
            borderRadius={"2xl"}
            bg={theme.primaryColor}
            shadow="2xl"
            style={{ cursor: "pointer" }}
          >
            Connect Wallet
          </Button>
        ) : (
          <WalletDetails
            close={() => setWalletsModel(true)}
            logo={NEAR}
            address={user.account}
            balance={user.balance}
          />
        )}

        <IsLoggedIn>
          <Box
            onMouseEnter={() => setOpenDropDown(true)}
            cursor={"pointer"}
            border={"3px"}
            borderStyle="solid"
            borderColor={theme.primaryColor}
            borderRadius={"50%"}
            bg={theme.fgColor}
            boxShadow={`
        1px 1px 3px ${theme.primaryColor}`}
          >
            <AiOutlineUser color={theme.primaryColor} size={32} />
          </Box>
          <UserDropDown
            openDropDown={openDropDown}
            setOpenDropDown={(t: boolean) => setOpenDropDown(t)}
          />
        </IsLoggedIn>
      </GridItem>

      <GridItem position={"absolute"} width="100%" justifyContent={"center"}>
        <Text color={theme.primaryColor} fontWeight="bold" textAlign={"center"}>
          Axle games launching soon
        </Text>
      </GridItem>
    </Grid>
  );
};

export default Navbar;
