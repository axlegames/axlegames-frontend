import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";

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
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent={"center"}
        width={"100%"}
        rowGap=".6rem"
      >
        <WalletButton click={props.connectToNEAR} label="NEAR" />
        <WalletButton click={props.connectToMetaMask} label="Metamask" />
      </Flex>
      {props.isConnected ? (
        <Box>
          <Divider my={6} width="80%" />
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
    <Button
      justifyContent={"left"}
      px={5}
      size={"lg"}
      variant={"outline"}
      width={"100%"}
      borderRadius={"xl"}
      bg={theme.fgColor}
      color={theme.primaryColor}
      py={3}
      _hover={{
        bg: theme.primaryColor,
        color: theme.bgColor,
      }}
      fontSize={"xl"}
      onClick={props.click}
    >
      {props.label}
    </Button>
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
