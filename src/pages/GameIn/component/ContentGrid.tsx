import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

import Compete from "../../../assets/gamein/compete.png";
import ChargeUp from "../../../assets/gamein/chargeup.png";
import Compound from "../../../assets/gamein/compound.png";
import Collect from "../../../assets/gamein/collect.png";

const data = [
  {
    img: Compete,
    title: "Compete",
    content: "Play web3 skill games with friends on Axle and win $AXLE tokens",
  },
  {
    img: ChargeUp,
    title: "ChargeUp",
    content: "Use $AXLE tokens to power up and boost rewards on axle games",
  },
  {
    img: Compound,
    title: "Compound",
    content: "Stake $AXLE and earn compound interest with a decent APY",
  },
  {
    img: Collect,
    title: "Collect",
    content: "Purchase or win AXLE game NFT rewards by playing games",
  },
];

const ContentGrid = () => {
  return (
    <Box>
      <Text
        textAlign={"center"}
        fontWeight="bold"
        fontSize={"3xl"}
        color={theme.primaryTextColor}
        py={{ base: "8" }}
      >
        Utilities
      </Text>
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        justifyContent="center"
        alignItems={"center"}
        width={{ md: "70%", xl: "60%" }}
        margin={{ base: "8", md: "auto" }}
        rowGap="3rem"
        columnGap={"3rem"}
      >
        {data.map((d, i) => (
          <GridItem display={"flex"} justifyContent="center" key={i}>
            <Box
              maxW={"920px"}
              minW={"450px"}
              p={{ base: "8" }}
              bg={theme.fgColor}
              borderRadius="md"
              shadow={"lg"}
              fontWeight="bold"
              display={"flex"}
              flexDirection="row"
              alignItems={"center"}
              columnGap="1rem"
            >
              <Image width={{ base: "24" }} src={d.img} />
              <Flex direction={"column"}>
                <Text fontSize={"xl"} color={theme.primaryTextColor}>
                  {d.title}
                </Text>
                <Text fontSize={"md"} fontWeight="bold" color={`#ffffff`}>
                  {d.content}
                </Text>
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ContentGrid;
