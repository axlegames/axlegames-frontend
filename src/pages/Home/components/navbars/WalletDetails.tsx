import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

const WalletDetails = (props: any) => {
  const balance = (Number(props.balance) / 10 ** 24).toFixed(2);
  return (
    <Box
      onClick={props.close}
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
    </Box>
  );
};

export default WalletDetails;
