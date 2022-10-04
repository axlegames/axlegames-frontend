import { Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";

import NEAR from "../../assets/logos/NEAR.svg";
import MetaMask from "../../assets/logos/metamask.svg";
import WalletConnect from "../../assets/logos/walletconnect.svg";
import TrustWallet from "../../assets/logos/trustwallet.svg";

const Wallets = (props: any) => {
  return (
    <Box
      flexDirection={"column"}
      display={"flex"}
      justifyContent={"center"}
      alignItems="center"
      py={8}
      px={4}
    >
      <Text p={4} textAlign={"center"} fontSize={"3xl"}>
        Wallet
      </Text>
      <Box width="30%">
        <WalletButton
          disabled={false}
          click={props.connectToNEAR}
          img={NEAR}
          label="NEAR"
        />
      </Box>
      <Divider my={8} />
      <Flex
        alignItems="center"
        justifyContent={"center"}
        width={"100%"}
        columnGap=".6rem"
      >
        <WalletButton
          click={props.connectToMetaMask}
          img={MetaMask}
          label="Metamask"
          disabled={false}
        />
        <WalletButton
          img={WalletConnect}
          label="WalletConnect"
          disabled={true}
        />
        <WalletButton img={TrustWallet} label="TrustWallet" disabled={true} />
      </Flex>
      {props.isConnected ? (
        <Box pt={8}>
          <ConnectedWallet
            disconnect={props.disconnect}
            address={props.address}
          />
        </Box>
      ) : null}
    </Box>
  );
};

const WalletButton = (props: any) => {
  return (
    <Box
      justifyContent={"left"}
      px={3}
      py={6}
      width={"100%"}
      borderRadius={"xl"}
      bg={theme.highLightColor}
      opacity={props.disabled ? 0.5 : 1}
      color={theme.primaryColor}
      _hover={{
        bg: !props.disabled ? theme.secondaryColor : "",
        color: !props.disabled ? theme.bgColor : "",
      }}
      fontSize={"xl"}
      onClick={props.click}
      shadow="dark-lg"
    >
      <Flex alignItems={"center"} direction={"column"} justifyContent="center">
        <Image height={"12"} width="12" src={props.img}></Image>
        <Text> {props.label}</Text>
      </Flex>
    </Box>
  );
};

const ConnectedWallet = (props: any) => {
  return (
    <Box
      columnGap={"1rem"}
      alignItems="center"
      display={"flex"}
      justifyContent="space-between"
    >
      <Text>Connected with {props.address}</Text>
      <Button
        size="sm"
        variant={"outline"}
        color={theme.primaryColor}
        bg={theme.bgColor}
        onClick={props.disconnect}
      >
        Disconnect
      </Button>
    </Box>
  );
};

export default Wallets;
