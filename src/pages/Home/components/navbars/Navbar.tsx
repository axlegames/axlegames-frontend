import { theme } from "../../../../config/theme.config";
import { useEffect, useState } from "react";
import { Box, Text, Button, Grid, GridItem } from "@chakra-ui/react";

import { AiOutlineUser } from "react-icons/ai/index";
import IsLoggedIn from "../../../../config/isLoggedIn";

import Dialog from "../../../Auth/dialogs/Dialog";
import WalletsDialog from "../../../Auth/dialogs/WalletsDialog";
import UserDropDown from "./UserDropDown";

import { NearConnectionServices } from "../../connections/NearConnection";

import WalletDetails from "./WalletDetails";

import NEAR from "../../../../assets/logos/NEAR.svg";
import ETH from "../../../../assets/logos/ETH.svg";

import { formatEther } from "@ethersproject/units";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Props {
  account: string;
  balance: string;
  isConnected: boolean;
}

interface NavbarProps {
  open: boolean;
  onOpen: Function;
  onClose: Function;
}

const Navbar = (props: NavbarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<Props>({
    account: "",
    balance: "",
    isConnected: false,
  });
  const [details, setDetails] = useState({
    label: "",
    logo: "",
  });
  const [wallet, setWallet] = useState<any>({});
  const [openDropDown, setOpenDropDown] = useState(false);

  const { activateBrowserWallet, deactivate, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  const connectToNEAR = async () => {
    const wallet = await NearConnectionServices.connectWallet();
    const account = await wallet.getAccountId();
    const amount = (await wallet.account().state()).amount;
    setUser({
      account: account,
      balance: amount,
      isConnected: true,
    });
    setWallet(wallet);
    setDetails({ logo: NEAR, label: "NEAR" });
    localStorage.setItem("address", account);
    props.onClose();
  };

  const connectToMetaMask = async () => {
    activateBrowserWallet();
    setUser({
      account: account?.toString() ?? "",
      balance: formatEther(etherBalance ?? 1).toString(),
      isConnected: account ? true : false,
    });
    setDetails({ logo: ETH, label: "ETH" });
    localStorage.setItem("address", account!);
    props.onClose();
  };

  const disconnect = async () => {
    try {
      deactivate();
      wallet.signOut();
      setWallet({});
      setUser({
        account: "",
        balance: "",
        isConnected: false,
      });
    } catch (error) {
    } finally {
      localStorage.removeItem("address");
      navigate("/");
      window.location.reload();
    }
  };

  useEffect(() => {
    setUser({
      account: account?.toString() ?? "",
      balance: formatEther(etherBalance ?? 1).toString(),
      isConnected: account ? true : false,
    });
    setDetails({ logo: ETH, label: "ETH" });
    localStorage.setItem("address", account!);
  }, [account, etherBalance]);

  useEffect(() => {
    const account = searchParams.get("account_id");
    if (account !== null) {
      connectToNEAR();
      setDetails({ logo: NEAR, label: "NEAR" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, setSearchParams]);

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
      p={2}
      shadow="lg"
    >
      <Dialog
        size="2xl"
        children={
          <WalletsDialog
            isConnected={user.isConnected}
            disconnect={disconnect}
            address={user.account}
            connectToNEAR={connectToNEAR}
            connectToMetaMask={connectToMetaMask}
          />
        }
        isOpen={props.open}
        close={props.onClose}
      />
      <GridItem
        width={"100%"}
        justifyContent={"flex-end"}
        columnGap={"1rem"}
        display={"flex"}
        flexDirection="row"
        pr={"24"}
      >
        {!user.isConnected ? (
          <Button
            _hover={{
              color: theme.primaryColor,
              bg: theme.bgColor,
            }}
            zIndex={2000}
            onClick={() => props.onOpen()}
            borderRadius={"2xl"}
            bg={theme.primaryColor}
            shadow="2xl"
            style={{ cursor: "pointer" }}
          >
            Connect Wallet
          </Button>
        ) : (
          <WalletDetails
            close={props.onOpen}
            logo={details.logo}
            label={details.label}
            address={user.account}
            balance={user.balance}
            disconnect={disconnect}
          />
        )}

        <IsLoggedIn>
          <Box
            display={"flex"}
            alignItems={"center"}
            cursor={"pointer"}
            borderStyle="solid"
            bg={theme.fgColor}
          >
            <Box
              zIndex={3000}
              cursor="pointer"
              onClick={() => setOpenDropDown(true)}
              borderRadius={"3xl"}
              boxShadow={`0px 0px 8px ${theme.secondaryColor}`}
            >
              <AiOutlineUser color={theme.secondaryColor} size={38} />
            </Box>
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
