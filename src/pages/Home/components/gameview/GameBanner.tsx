import { Box, Flex, Text, Image, Grid, GridItem } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";
// import Carousel from "nuka-carousel/lib/carousel";

const GameBanner = (props: any) => {
  return (
    <Box maxW={"100%"} overflowX="hidden" pb={16}>
      <Flex flexDirection={"column"} p={{ base: "4" }}>
        <Text
          color={theme.primaryTextColor}
          fontSize={{ base: "1xl", lg: "3xl" }}
          fontWeight="bold"
        >
          Welcome to Axle Games
        </Text>
        <Text
          fontSize={{ base: "md", lg: "xl" }}
          color={theme.secondaryTextColor}
          fontWeight={"bold"}
        >
          A skill-based web3 gaming platform
        </Text>
      </Flex>
      <Grid
        marginRight="auto"
        width={"80%"}
        padding={{ md: "4" }}
        position={"relative"}
        overflowX={"hidden"}
        templateColumns={"1fr 1fr"}
        display={{ base: "none", md: "grid" }}
        columnGap="1rem"
      >
        <GridItem>
          <Image
            borderRadius={"3xl"}
            width={"100%"}
            src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_1.png"}
          />
        </GridItem>
        <GridItem>
          <Image
            borderRadius={"3xl"}
            width={"100%"}
            src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_3.png"}
          />
        </GridItem>
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
