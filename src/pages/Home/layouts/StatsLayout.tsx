import { Box, Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

import { GiPodiumWinner } from "react-icons/gi/index";
import { ImCool } from "react-icons/im/index";

import GameOnePic from "../../../assets/home/highlight/banners/banner.jpg";
import GameTwoPic from "../../../assets/home/highlight/banners/banner.jpg";

import GameThreePic from "../../../assets/home/highlight/banners/banner.jpg";
import GameFourPic from "../../../assets/home/highlight/banners/banner.jpg";

import StatsCard from "../components/StatsCard";

const StatsLayout = () => {
  const games = [
    {
      game: "Jetpack Joyride",
      img: GameOnePic,
      category: "Sessions",
      value: "1002",
    },
    {
      game: "Major Mahayem",
      img: GameTwoPic,
      category: "Sessions",
      value: "1292",
    },
  ];

  const winners = [
    {
      game: "Akash Madduru",
      img: GameThreePic,
      category: "Wins",
      value: "200",
    },
    {
      game: "Levi Ackerman",
      img: GameFourPic,
      category: "Wins",
      value: "242",
    },
  ];

  return (
    <Box
      color={theme.highLightColor}
      fontFamily={"quicksand"}
      fontWeight="bold"
      mx={{ base: "4", md: "8", lg: "auto" }}
      my={{ base: "4", md: "16" }}
      bg={theme.fgColor}
      p={{ base: "3" }}
      pb={{ lg: "8" }}
      width={{ lg: "70%", xl: "65%", "2xl": "60%" }}
      borderRadius={{ base: "2xl" }}
      display="flex"
      justifyContent={{ base: "center" }}
      alignItems={{ base: "center" }}
      flexDirection={{ base: "column", xl: "row" }}
      rowGap={{ base: "1rem" }}
      columnGap={{ base: "0", md: "3rem" }}
    >
      <Flex direction={{ base: "column" }}>
        <Flex
          alignItems={"center"}
          p={{ base: "1", md: "3" }}
          columnGap=".3rem"
        >
          <GiPodiumWinner size={26} color={theme.highLightColor} />
          <Text>Top Games</Text>
        </Flex>
        <Flex
          bg={theme.fgColor}
          borderRadius={{ base: "2xl" }}
          rowGap={"1rem"}
          direction={{ base: "row" }}
        >
          {games.map((game, index) => (
            <StatsCard
              key={index}
              game={game.game}
              img={game.img}
              category={game.category}
              value={game.value}
            />
          ))}
        </Flex>
      </Flex>

      <Flex direction={{ base: "column" }}>
        <Flex
          alignItems={"center"}
          p={{ base: "1", md: "3" }}
          columnGap=".3rem"
        >
          <ImCool size={26} color={theme.highLightColor} />
          <Text>Top Winners</Text>
        </Flex>
        <Flex
          bg={theme.fgColor}
          borderRadius={{ base: "2xl" }}
          rowGap={"1rem"}
          direction={{ base: "row" }}
        >
          {winners.map((game, index) => (
            <StatsCard
              key={index}
              game={game.game}
              img={game.img}
              category={game.category}
              value={game.value}
            />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default StatsLayout;
