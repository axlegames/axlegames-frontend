import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { theme } from "../../../../config/theme.config";

const WalletDetails = (props: any) => {
  let balance: any = 0;

  if (props.address[0] === "0")
    balance = (Number(props.balance) / 10 ** 24).toFixed(2);
  else balance = (Number(props.balance) / 10 ** 12).toFixed(2);

  const [open, setOpen] = useState(false);
  return (
    <Box
      pos={"relative"}
      zIndex={3000}
      cursor={"pointer"}
      onClick={() => setOpen(true)}
      py={2}
      px={4}
      mx={4}
      bg={theme.bgColor}
      borderRadius="xl"
    >
      <Flex
        justifyContent={"space-evenly"}
        alignItems="center"
        columnGap={"1rem"}
      >
        <Box bg={theme.highLightColor} borderRadius="2xl" p={2}>
          <Image height={4} width={4} src={props.logo} />
        </Box>
        <Flex color={theme.highLightColor} direction={"column"}>
          <Text fontSize={"smaller"}>
            {props.address.substr(0, 4)}....
            {props.address.substr(
              props.address.length - 4,
              props.address.length
            )}
          </Text>
          <Text fontSize={"small"}>
            {balance} {props.label}
          </Text>
        </Flex>
      </Flex>

      <Box
        borderRadius={"md"}
        my={4}
        display={open ? "flex" : "none"}
        bg={theme.secondaryColor}
        width={"220px"}
        mx={"auto"}
        left={0}
        right={0}
        position={"absolute"}
        justifyContent="center"
        flexDirection={"column"}
        p={3}
        rowGap=".5rem"
      >
        <Box
          p={6}
          display={"flex"}
          justifyContent="center"
          flexDirection={"column"}
          alignItems="center"
          bg={theme.bgColor}
          color={theme.primaryColor}
          borderRadius="md"
        >
          <Text fontSize={"sm"}>Your wallet balance</Text>
          <Text fontSize={"lg"}>
            {balance} {props.label}
          </Text>
        </Box>
        <Button
          _hover={{
            bg: theme.secondaryColor,
            color: theme.bgColor,
          }}
          color={theme.primaryColor}
          bg={theme.bgColor}
          variant={"outline"}
          onClick={props.disconnect}
        >
          Disconnect
        </Button>
      </Box>
    </Box>
  );
};

export default WalletDetails;
