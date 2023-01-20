import { Box, Text } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";

const Stake = () => {
  return (
    <Box fontFamily={"quicksand"} fontWeight="bold">
      <Box
        bg={theme.bgColor}
        display={"grid"}
        justifyContent="center"
        flexDirection={"column"}
        mt={24}
      >
        <Box
          border={`4px solid ${theme.primaryTextColor}`}
          boxShadow={`0px 0px 512px -30px ${theme.primaryTextColor}`}
          p={6}
          borderRadius="xl"
          bg={theme.fgColor}
          color={theme.primaryTextColor}
          fontWeight="bold"
          justifyContent={"center"}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          rowGap={"1rem"}
        >
          <Text fontSize={"3xl"}>Total Value Locked</Text>
          <Text fontSize={"xl"}>$20000000</Text>
          <Text fontSize={"sm"}>$ 0.00167 = 1 AXLE</Text>
        </Box>
        <Box
          mt={4}
          display={"flex"}
          border={`2px solid ${theme.primaryTextColor}`}
          borderRadius={"md"}
          justifyContent="space-between"
          fontSize="2xl"
          p={1}
          columnGap=".2rem"
          bg={theme.bgColor}
        >
          <Box
            borderRadius={"md"}
            px={8}
            py={4}
            width={"100%"}
            bg={theme.fgColor}
            color={theme.primaryButtonColor}
          >
            <Text>Flexible</Text>
          </Box>
          <Box
            color={theme.primaryButtonColor}
            borderRadius={"md"}
            px={8}
            py={4}
            width={"100%"}
            bg={theme.fgColor}
          >
            <Text>Locked</Text>
          </Box>
        </Box>
        <Box>
          <Text>FLEXIBLE STAKING</Text>
          <Text> APY: 12% </Text>
          <Text> Total $AXLE in Flexible Staking</Text>
          597,297,277.293 AXLE
        </Box>
      </Box>
    </Box>
  );
};

export default Stake;
