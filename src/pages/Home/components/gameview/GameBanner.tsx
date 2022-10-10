import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";
import Carousel from "nuka-carousel/lib/carousel";

const GameBanner = (props: any) => {
  return (
    <Box pb={16}>
      <Flex flexDirection={"column"} py={{ base: "8" }} px={{ base: "4" }}>
        <Text fontSize={"3xl"} fontWeight="bold">
          Welcome to Axle
        </Text>
        <Text color={theme.highLightColor} fontWeight={"bold"}>
          A skill based web3 gaming platform
        </Text>
      </Flex>
      <Box
        display={{ base: "none", md: "flex" }}
        columnGap="1rem"
        alignItems="center"
        flexDirection={{ base: "row" }}
        rowGap={{ base: "1rem", lg: "0" }}
        justifyContent={"start"}
      >
        <Image
          borderRadius={"2xl"}
          height={172}
          src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_1.png"}
        />
        <Image
          borderRadius={"2xl"}
          height={172}
          src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_3.png"}
        />
        {/* <Image
          borderRadius={"2xl"}
          height={172}
          src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_2.png"}
        /> */}
      </Box>
      <Box
        display={{ base: "flex", md: "none" }}
        justifyContent="center"
        alignItems={"center"}
        px={"6"}
        borderRadius="2xl"
      >
        <Carousel style={{ borderRadius: "2vh" }} autoplay={true}>
          <Box
            width={"100%"}
            display={"flex"}
            alignSelf={"center"}
            justifySelf="center"
          >
            <Image
              borderRadius={"2xl"}
              height={{ md: 172 }}
              src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_1.png"}
            />
          </Box>

          <Box display={"flex"} alignSelf={"center"} justifySelf="center">
            <Image
              borderRadius={"2xl"}
              height={{ md: 172 }}
              src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_3.png"}
            />
          </Box>

          {/* <Image
          borderRadius={"2xl"}
          height={172}
          src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_2.png"}
        /> */}
        </Carousel>
      </Box>
    </Box>
  );
};

export default GameBanner;
