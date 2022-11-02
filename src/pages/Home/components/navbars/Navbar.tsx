import { theme } from "../../../../config/theme.config";
import { useEffect, useState } from "react";
import { Button, Grid, GridItem } from "@chakra-ui/react";

import Dialog from "../../../Auth/dialogs/Dialog";
import WalletsDialog from "../../../Auth/dialogs/WalletsDialog";

import { NearConnectionServices } from "../../connections/NearConnection";

import WalletDetails from "./WalletDetails";

import NEAR from "../../../../assets/logos/NEAR.svg";
import ETH from "../../../../assets/logos/ETH.svg";

import { formatEther } from "@ethersproject/units";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { useNavigate, useSearchParams } from "react-router-dom";

declare global {
  interface Window {
    ethereum: import("ethers").providers.ExternalProvider;
  }
}

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

  const { activateBrowserWallet, deactivate, account, chainId } = useEthers();
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

  const getSymbol = (chainId: number) => {
    if (chainId === 97) {
      return "BNB";
    } else return "ETH";
  };

  const connectToMetaMask = async () => {
    activateBrowserWallet();
    setUser({
      account: account?.toString() ?? "",
      balance: formatEther(etherBalance ?? 1).toString(),
      isConnected: account ? true : false,
    });

    const label = getSymbol(chainId || 0);
    setDetails({ logo: ETH, label: label });
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
      console.log(error);
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
    setDetails({ logo: ETH, label: getSymbol(chainId || 0) });
    localStorage.setItem("address", account!);
  }, [account, etherBalance, chainId]);

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
      bg={theme.bgColor}
      color={theme.bgColor}
      fontFamily="quicksand"
      fontWeight={"bold"}
      display={{ base: "none", lg: "flex" }}
      p={2}
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
        pr={"6"}
      >
        {!user.isConnected ? (
          <Button
            _hover={{
              color: theme.primaryTextColor,
              bg: theme.bgColor,
            }}
            zIndex={2000}
            onClick={() => props.onOpen()}
            borderRadius={"2xl"}
            bg={theme.primaryMiscColor}
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
      </GridItem>
    </Grid>
  );
};

export default Navbar;
