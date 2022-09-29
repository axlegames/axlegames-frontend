import { theme } from "../../../config/theme.config";
import { SiEthereum } from "react-icons/si/index";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import * as nearAPI from "near-api-js";
const { connect, keyStores, WalletConnection } = nearAPI;

const Navbar = () => {
  const connectWallet = async () => {
    const connectionConfig = {
      networkId: "testnet",
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };
    // connect to NEAR
    const nearConnection = await connect(connectionConfig);
    // create wallet connection
    const wallet = new WalletConnection(nearConnection, "testapp");
    if (!wallet.isSignedIn()) return wallet.requestSignIn({});
  };

  return (
    <Box
      bg={theme.fgColor}
      color={theme.bgColor}
      fontFamily="quicksand"
      px={{ base: "12" }}
      py={{ base: "4" }}
      fontWeight={"bold"}
      alignItems="center"
      justifyContent={{ lg: "flex-end" }}
      columnGap="1rem"
      display={{ base: "none", lg: "flex" }}
    >
      <Button
        _hover={{
          color: theme.primaryColor,
          bg: theme.bgColor,
        }}
        borderRadius={"2xl"}
        bg={theme.primaryColor}
        shadow="2xl"
        onClick={connectWallet}
      >
        <Flex columnGap={".5rem"}>
          <Text>Connect Wallet</Text>
          <SiEthereum color={theme.fgColor} />
        </Flex>
      </Button>
    </Box>
  );
};

export default Navbar;
