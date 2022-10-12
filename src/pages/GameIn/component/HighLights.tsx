import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

import Logo from "../../../assets/home/logos/logo.png";

const Highlights = (props: any) => {
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
        direction={{ base: "column", lg: "row" }}
      >
        <Box p={{ base: "0", lg: "12" }}>
          <Image src={Logo} />
        </Box>
        <Flex direction={"column"}>
          <Text fontSize={"3xl"}>Finest designed gaming and NFT Project</Text>
          <Text fontWeight={"normal"}>
            GameInfinity project, tokenomics, roadmap and whitepaper is designed
            to serve the best crypto project to all the participants.
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Highlights;
