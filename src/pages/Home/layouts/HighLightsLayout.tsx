import { Box, Image, Flex, Text, Button } from "@chakra-ui/react";
import Carousel from "nuka-carousel";

import GameOneBanner from "../../../assets/home/highlight/banners/banner.jpg";
import { theme } from "../../../config/theme.config";

const HighLightsLayout = () => {
  const titles = [
    "Major Mayhem",
    "Jetpack JoyRide",
    "Cut The Cut",
    "Gold Rush",
    "Angry Birds",
    "Dude Perfect",
  ];

  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
      marginY={{ lg: "4rem" }}
      marginX={{ lg: "auto" }}
      width={{ lg: "90%" }}
    >
      <Carousel
        animation="fade"
        autoplay={true}
        defaultControlsConfig={{
          pagingDotsStyle: {
            marginLeft: ".5rem",
            marginRight: ".5rem",
            color: theme.highLightColor,
          },
          prevButtonStyle: {
            borderTopRightRadius: "2vh",
            borderBottomRightRadius: "2vh",
            fontFamily: "quicksand",
            fontWeight: "bolder",
          },
          nextButtonStyle: {
            borderTopLeftRadius: "2vh",
            borderBottomLeftRadius: "2vh",
            fontFamily: "quicksand",
            fontWeight: "bolder",
          },
        }}
        wrapAround={true}
        slidesToShow={1}
      >
        {titles.map((title, index) => (
          <Flex
            key={index}
            position={"relative"}
            direction={"column"}
            borderRadius={{ lg: "2xl" }}
          >
            <Image
              backgroundSize={"contain"}
              maxH={"70vh"}
              src={GameOneBanner}
              borderRadius={{ lg: "2xl" }}
            />
            <Box
              bg={theme.primaryColor}
              px={{ base: "4" }}
              py={{ base: "2" }}
              top={0}
              borderBottomRightRadius={{ base: "2xl" }}
              borderTopLeftRadius={{ lg: "2xl" }}
              position={"absolute"}
              shadow="dark-lg"
            >
              <Text
                fontWeight={"bold"}
                fontSize={{ lg: "3xl" }}
                color={theme.highLightColor}
              >
                {title}
              </Text>
            </Box>
            <Button
              borderRadius={{ base: "2xl" }}
              bg={theme.primaryColor}
              color={theme.highLightColor}
              fontWeight={"bold"}
              size={{ base: "md", xl: "lg" }}
              width={{ base: "36" }}
              top={{ base: "65%", sm: "70%", md: "72%" }}
              bottom={0}
              left={0}
              right={0}
              margin="auto"
              position={"absolute"}
              _hover={{
                color: theme.bgColor,
                bg: theme.highLightColor,
              }}
            >
              Play
            </Button>
          </Flex>
        ))}
      </Carousel>
    </Box>
  );
};

export default HighLightsLayout;
