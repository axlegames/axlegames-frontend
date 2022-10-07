import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { theme } from "../../../../config/theme.config";

const WalletDetails = (props: any) => {
  const ref = useRef<any>();

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const Balance = () => {
    let balance = props.balance;
    if (props.address[0] !== "0")
      balance = (Number(props.balance) / 10 ** 24).toFixed(2);
    balance = Number(balance).toFixed(3);
    return (
      <Text>
        {balance} {props.label}
      </Text>
    );
  };

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
          <Balance />
        </Flex>
      </Flex>

      <Box
        ref={ref}
        borderRadius={"md"}
        my={4}
        display={open ? "flex" : "none"}
        bg={theme.bgColor}
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
          bg={theme.fgColor}
          color={theme.secondaryColor}
          borderRadius="md"
        >
          <Text fontSize={"sm"}>Your wallet balance</Text>
          <Balance />
        </Box>
        <Button
          _hover={{
            bg: theme.fgColor,
            color: theme.secondaryColor,
          }}
          color={theme.secondaryColor}
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
