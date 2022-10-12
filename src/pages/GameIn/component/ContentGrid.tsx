import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import Icon from "../../../assets/home/logos/icon.png";

const data = [
  {
    title: "Pay for Games",
    content: "Win NFT's and Crypto rewards on multiple events.",
  },
  {
    title: "Pay for NFT's",
    content: "Win NFT's and Crypto rewards on multiple events.",
  },
  {
    title: "Stake GameIn",
    content: "Win NFT's and Crypto rewards on multiple events.",
  },
  {
    title: "Network Payments",
    content: "Win NFT's and Crypto rewards on multiple events.",
  },
];

const ContentGrid = () => {
  return (
    <Box py={{ base: "8" }}>
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        justifyContent="center"
        alignItems={"center"}
        width={{ md: "70%", xl: "60%" }}
        margin={{ base: "8", md: "auto" }}
        rowGap="1rem"
        columnGap={"1rem"}
      >
        {data.map((d, i) => (
          <GridItem display={"flex"} justifyContent="center" key={i}>
            <Box
              maxW={"520px"}
              p={{ base: "4" }}
              bg={theme.fgColor}
              borderRadius="md"
              shadow={"lg"}
              fontWeight="bold"
              display={"flex"}
              flexDirection="column"
              rowGap={"1rem"}
            >
              <Image width={{ base: "16" }} src={Icon} />
              <Text fontSize={"xl"} color={theme.primaryTextColor}>
                {d.title}
              </Text>
              <Text fontSize={"lg"} color={theme.secondaryTextColor}>
                {d.content}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ContentGrid;
