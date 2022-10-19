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
      width={{ base: "100%", md: "80%" }}
      mx={{ base: "0", md: "auto" }}
    >
      <Flex
        alignItems={"center"}
        columnGap={"2rem"}
        rowGap={"1rem"}
        direction={{ base: "column", xl: "row" }}
      >
        <Box bg={theme.bgColor} borderRadius="xl" p={{ base: "0", lg: "12" }}>
          <Image maxWidth={"64"} width={"80"} src={WP} />
        </Box>
        <Flex
          p={8}
          bg={theme.bgColor}
          borderRadius="xl"
          rowGap={".5rem"}
          direction={"column"}
        >
          <Text color={theme.primaryTextColor} fontSize={"3xl"}>
            Finest designed gaming and NFT Project
          </Text>
          <Text>
            GameInfinity project, tokenomics, roadmap and whitepaper is designed
            to serve the best crypto project to all the participants.
          </Text>
          <Button
            color={`black`}
            bg={theme.primaryButtonColor}
            mt="4"
            width={"44"}
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%" }}
              href="https://axlegames.s3.ap-south-1.amazonaws.com/AxleGames_EconomicsPaper.pdf"
            >
              Economics Paper
            </a>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default WhitePaper;
