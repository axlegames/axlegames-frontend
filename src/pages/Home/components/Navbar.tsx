import { theme } from "../../../config/theme.config";
import { SiEthereum } from "react-icons/si/index";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai/index";

import * as nearAPI from "near-api-js";
import { useState } from "react";
import { BiLogOut, BiUser, BiCog } from "react-icons/bi";
import IsLoggedIn from "../../../config/isLoggedIn";

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
  const signout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const [menu, setMenu] = useState(false);

  const Menu = () => {
    if (menu)
      return (
        <Box
          display={"flex"}
          flexDirection="column"
          onMouseEnter={() => setMenu(true)}
          onMouseLeave={() => setMenu(false)}
          px={4}
          py={4}
          borderRadius={"lg"}
          bg={theme.primaryColor}
          position={"absolute"}
          bottom="-300%"
          rowGap={".5rem"}
          maxWidth={"200px"}
        >
          <Text fontFamily={"quicksand"}>
            Welcome, {localStorage.getItem("username")}
          </Text>

          <Button
            _hover={{
              color: theme.primaryColor,
              bg: theme.bgColor,
            }}
            bg={theme.primaryColor}
            shadow="2xl"
            onClick={signout}
            justifyContent="flex-start"
          >
            <Flex columnGap={"0.5rem"} alignItems={"center"}>
              <BiUser size={28} />
              <Text>Profile</Text>
            </Flex>
          </Button>
          <Button
            _hover={{
              color: theme.primaryColor,
              bg: theme.bgColor,
            }}
            bg={theme.primaryColor}
            shadow="2xl"
            onClick={signout}
            justifyContent="flex-start"
          >
            <Flex columnGap={"0.5rem"} alignItems={"center"}>
              <BiCog size={28} />
              <Text>Settings</Text>
            </Flex>
          </Button>

          <Button
            _hover={{
              color: theme.primaryColor,
              bg: theme.bgColor,
            }}
            bg={theme.primaryColor}
            shadow="2xl"
            onClick={signout}
            justifyContent="flex-start"
          >
            <Flex columnGap={"0.5rem"} alignItems={"center"}>
              <BiLogOut size={28} />
              <Text>Logout</Text>
            </Flex>
          </Button>
        </Box>
      );
    return null;
  };

  return (
    <Box
      position={"relative"}
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

      <IsLoggedIn>
        <Box
          onMouseEnter={() => setMenu(true)}
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
        <Menu />
      </IsLoggedIn>
    </Box>
  );
};

export default Navbar;
