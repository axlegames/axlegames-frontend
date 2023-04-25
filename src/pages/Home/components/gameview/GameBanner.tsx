import { Box, Flex, Text, Image, Grid, GridItem } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";
// import Carousel from "nuka-carousel/lib/carousel";

const GameBanner = (props: any) => {
  return (
    <Box maxW={"100%"} overflowX="hidden" py={4}>
      <Flex
        columnGap={"2rem"}
        flexDirection={"row"}
        alignContent="center"
        p={{ base: "4" }}
      >
        <Box>
          <Text
            fontFamily={"quicksand"}
            color={theme.primaryTextColor}
            fontSize={{ base: "1xl", lg: "3xl" }}
            fontWeight="bold"
          >
            Welcome{" "}
            {localStorage.getItem("username")
              ? localStorage.getItem("name")
              : "to Axle Games"}
          </Text>
          <Text
            fontFamily={"quicksand"}
            fontSize={{ base: "md", lg: "xl" }}
            color={theme.secondaryTextColor}
            fontWeight={"bold"}
          >
            A skill-based web3 gaming platform
          </Text>
        </Box>
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
          <a
            href={`https://t.me/axlegames_en`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              borderRadius={"3xl"}
              width={"100%"}
              src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_1.png"}
            />
          </a>
        </GridItem>
        <GridItem>
          <a
            href="https://play.axlegames.io"
            // href={`https://sale.axlegames.io`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              borderRadius={"3xl"}
              width={"100%"}
              src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_3.png"}
            />
          </a>
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
