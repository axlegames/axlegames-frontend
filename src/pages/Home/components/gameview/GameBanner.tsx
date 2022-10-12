import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";
import Carousel from "nuka-carousel/lib/carousel";

const GameBanner = (props: any) => {
  return (
    <Box color={theme.primaryColor} pb={16}>
      <Flex flexDirection={"column"} p={{ base: "4" }}>
        <Text fontSize={{ base: "3xl", lg: "5xl" }} fontWeight="bold">
          Welcome to Axle Games
        </Text>
        <Text
          fontSize={{ base: "xl", lg: "3xl" }}
          color={theme.highLightColor}
          fontWeight={"bold"}
        >
          A skill-based web3 gaming platform
        </Text>
      </Flex>
      <Box
        display={{ base: "none", "2xl": "flex" }}
        columnGap="1rem"
        alignItems="center"
        flexDirection={{ base: "row" }}
        rowGap={{ base: "1rem", lg: "0" }}
        justifyContent={"start"}
      >
        <Image
          height={"320px"}
          borderRadius={"2xl"}
          src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_1.png"}
        />
        <Image
          height={"320px"}
          borderRadius={"2xl"}
          src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_3.png"}
        />
      </Box>
      <Box
        display={{ base: "flex", "2xl": "none" }}
        justifyContent="center"
        alignItems={"center"}
        px={"6"}
        borderRadius="2xl"
      >
        <Carousel
          wrapAround={true}
          autoplayInterval={3000}
          defaultControlsConfig={{
            nextButtonStyle: {
              display: "none",
            },
            prevButtonStyle: {
              display: "none",
            },
            pagingDotsStyle: {
              marginLeft: ".3rem",
              marginRight: ".3rem",
            },
          }}
          style={{ borderRadius: "2vh" }}
          autoplay={true}
          animation="zoom"
          autoplayReverse={true}
        >
          <Box display={"flex"} alignSelf={"center"} justifySelf="center">
            <Image
              borderRadius={"2xl"}
              src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_1.png"}
            />
          </Box>

          <Box display={"flex"} alignSelf={"center"} justifySelf="center">
            <Image
              borderRadius={"2xl"}
              src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_3.png"}
            />
          </Box>
        </Carousel>
      </Box>
    </Box>
  );
};

export default GameBanner;
