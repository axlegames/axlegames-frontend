import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

import NeuButton from "../component/NeuButton";

const WhitePaper = (props: any) => {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      rowGap={"8rem"}
      color={theme.secondaryTextColor}
      p={{ base: "4" }}
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
        <Box borderRadius="xl">
          <Image
            width={{ base: "32", lg: "64" }}
            src={`https://axlegames.s3.ap-south-1.amazonaws.com/assets/gamein/whitepaper.png`}
            m={4}
          />
        </Box>
        <Flex p={4} borderRadius="xl" rowGap={".5rem"} direction={"column"}>
          <Text color={theme.primaryTextColor} fontSize={"3xl"}>
            A well-designed Deflationary token model
          </Text>
          <Text>
            Axle games tokenomics is designed to create solid, reliable and
            attractive ways for users to benefit from the platform.
          </Text>
          <Box columnGap={"1rem"} display={"flex"} mt={3}>
            <Box>
              <a
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: "100%" }}
                href="https://axlegames.s3.ap-south-1.amazonaws.com/AxleGames_EconomicsPaper.pdf"
              >
                <NeuButton
                  onClick={() => {}}
                  bg={"#A34400"}
                  shadow={"#FF7C1F"}
                  label={`Economics Paper`}
                ></NeuButton>
              </a>
            </Box>
            <Box>
              <a
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: "100%" }}
                href="https://whitepaper.axlegames.io/"
              >
                <NeuButton
                  onClick={() => {}}
                  bg={"#A34400"}
                  shadow={"#FF7C1F"}
                  label={`White Paper`}
                ></NeuButton>
              </a>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default WhitePaper;
