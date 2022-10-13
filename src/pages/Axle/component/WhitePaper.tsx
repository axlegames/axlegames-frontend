import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

import WP from "../../../assets/gamein/whitepaper.png";

const WhitePaper = (props: any) => {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      rowGap={"8rem"}
      color={theme.secondaryTextColor}
      p={{ base: "8" }}
      fontWeight="bold"
      fontSize={"xl"}
      width={{ base: "100%", md: "80%" }}
      mx={{ base: "0", md: "auto" }}
    >
      <Flex
        alignItems={"center"}
        columnGap={"2rem"}
        rowGap={"1rem"}
        direction={{ base: "column", xl: "row" }}
      >
        <Box p={{ base: "0", lg: "12" }}>
          <Image maxWidth={"64"} width={"80"} src={WP} />
        </Box>
        <Flex rowGap={".5rem"} direction={"column"}>
          <Text color={theme.primaryTextColor} fontSize={"3xl"}>
            Finest designed gaming and NFT Project
          </Text>
          <Text>
            GameInfinity project, tokenomics, roadmap and whitepaper is designed
            to serve the best crypto project to all the participants.
          </Text>
          <Button mt="4" width={"44"}>
            Economics Paper
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default WhitePaper;
