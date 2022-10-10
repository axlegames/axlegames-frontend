import { Box, Button } from "@chakra-ui/react";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { NearConnectionServices } from "../../connections/NearConnection";

import NEAR from "../../../../assets/logos/NEAR.svg";
import ETH from "../../../../assets/logos/ETH.svg";

import Dialog from "../../../Auth/dialogs/Dialog";
import WalletsDialog from "../../../Auth/dialogs/WalletsDialog";
import { theme } from "../../../../config/theme.config";
import WalletDetails from "../navbars/WalletDetails";

interface Props {
  account: string;
  balance: string;
  isConnected: boolean;
}

interface WalletDialogProps {
  open: boolean;
  onOpen: Function;
  onClose: Function;
}

const ConnectWallet = (props: WalletDialogProps) => {
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

    console.log(account);
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
    console.log(account);
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
    <Box>
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
      <Box justifyContent={"flex-end"} display={"flex"}>
        {!user.isConnected ? (
          <Button
            _hover={{
              color: theme.primaryColor,
              bg: theme.bgColor,
              boxShadow: `0px 0px 4px ${theme.primaryColor}`,
            }}
            zIndex={2000}
            color={theme.bgColor}
            onClick={() => props.onOpen()}
            borderRadius={"2xl"}
            bg={theme.primaryColor}
            style={{ cursor: "pointer" }}
            boxShadow={`0px 0px 4px ${theme.primaryColor}`}
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
      </Box>
    </Box>
  );
};

export default ConnectWallet;
