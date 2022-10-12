import { Box, Flex, Text, Image, Grid } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";
// import Carousel from "nuka-carousel/lib/carousel";

const GameBanner = (props: any) => {
  return (
    <Box maxW={"100%"} overflowX="hidden" color={theme.primaryColor} pb={16}>
      <Flex flexDirection={"column"} p={{ base: "4" }}>
        <Text fontSize={{ base: "1xl", lg: "3xl" }} fontWeight="bold">
          Welcome to Axle Games
        </Text>
        <Text
          fontSize={{ base: "md", lg: "xl" }}
          color={theme.highLightColor}
          fontWeight={"bold"}
        >
          A skill-based web3 gaming platform
        </Text>
      </Flex>

      <Grid
        templateColumns={"1fr 1fr"}
        position={"relative"}
        borderRadius={"2xl"}
        display={{ base: "none", md: "grid" }}
        columnGap="1rem"
        overflowX={"hidden"}
      >
        <Image
          maxW={"100%"}
          width="auto"
          height={"auto"}
          borderRadius={"2xl"}
          src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_1.png"}
        />
        <Image
          width="auto"
          height={"auto"}
          maxW={"100%"}
          borderRadius={"2xl"}
          src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_3.png"}
        />
      </Grid>
      {/* <Box
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
      </Box> */}
    </Box>
  );
};

export default GameBanner;
