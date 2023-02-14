import { theme } from "../../config/theme.config";
import { useEffect, useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import WalletDetails from "./components/WalletDetails";

import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { ethers } from "ethers";

interface NavbarProps {
  open: boolean;
  onOpen: Function;
  onClose: Function;
}

const NavbarLayout = (props: NavbarProps) => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState<string>("");
  const [openWallet, setOpenWallet] = useState(false);

  const web3Modal = new Web3Modal({
    network: "mainnet",
    theme: "dark",
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

  const disconnectWeb3Modal = async () => {
    web3Modal.clearCachedProvider();
    window.localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const connectWeb3Wallet = async () => {
      try {
        const web3Provider = await web3Modal.connect();
        console.log(web3Provider);
        const provider = new ethers.providers.Web3Provider(web3Provider);
        const web3Accounts = await provider.listAccounts();
        localStorage.setItem("address", web3Accounts[0]);
        localStorage.setItem("isWalletConnected", "true");
        setAddress(web3Accounts[0]);
        const network = await provider.getNetwork();
        if (network.chainId !== 56) switchNetwork();
        let bnbBal: any = await provider.getBalance(web3Accounts[0]);
        bnbBal = Number(ethers.utils.formatEther(bnbBal));
        setBalance(bnbBal);
      } catch (error) {
        console.log(error);
      }
    };
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
    <Grid
      position={"relative"}
      bg={theme.bgColor}
      color={theme.bgColor}
      fontFamily="quicksand"
      fontWeight={"bold"}
      display={{ base: "none", lg: "flex" }}
      p={2}
    >
      <GridItem
        width={"100%"}
        justifyContent={"flex-end"}
        columnGap={"1rem"}
        display={"flex"}
        flexDirection="row"
        pr={"6"}
      >
        <WalletDetails
          address={address}
          disconnect={() => disconnectWeb3Modal()}
          balance={balance.toString()}
          connectWallet={async () => {
            try {
              const web3Provider = await web3Modal.connect();
              const provider = new ethers.providers.Web3Provider(web3Provider);
              const web3Accounts = await provider.listAccounts();
              setAddress(web3Accounts[0]);
              const network = await provider.getNetwork();
              if (network.chainId !== 56) switchNetwork();
              let bnbBal: any = await provider.getBalance(web3Accounts[0]);
              bnbBal = Number(ethers.utils.formatEther(bnbBal));
              setBalance(bnbBal);
              localStorage.setItem("address", web3Accounts[0]);
            } catch (error) {
              console.log(error);
            }
          }}
          isLoading={false}
          openWallet={openWallet}
          setOpenWallet={setOpenWallet}
        />
      </GridItem>
    </Grid>
  );
};

export default NavbarLayout;
