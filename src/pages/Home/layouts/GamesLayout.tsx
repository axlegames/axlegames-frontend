import { useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Text,
  GridItem,
  Button,
  Image,
} from "@chakra-ui/react";

import { theme } from "../../../config/theme.config";
import Game1 from "../../../assets/home/highlight/games/game_1.jpg";
import Game2 from "../../../assets/home/highlight/games/game_2.jpg";
import Game3 from "../../../assets/home/highlight/games/game_3.jpg";
import Game4 from "../../../assets/home/highlight/games/game_4.jpg";
import Game5 from "../../../assets/home/highlight/games/game_5.jpg";
import Game6 from "../../../assets/home/highlight/games/game_6.jpg";
import Game7 from "../../../assets/home/highlight/games/game_7.jpg";
import Game8 from "../../../assets/home/highlight/games/game_8.jpg";
import Game9 from "../../../assets/home/highlight/games/game_9.jpg";
import Game10 from "../../../assets/home/highlight/games/game_10.jpg";
import Game11 from "../../../assets/home/highlight/games/game_11.jpg";
import Game12 from "../../../assets/home/highlight/games/game_12.jpg";
import Game13 from "../../../assets/home/highlight/games/game_13.jpg";

import GameEntryModal from "../modals/GameEntryModal";

const GamesLayout = () => {
  const gridItems = [
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  const images = [
    Game1,
    Game2,
    Game3,
    Game4,
    Game5,
    Game6,
    Game7,
    Game8,
    Game9,
    Game10,
    Game11,
    Game12,
    Game13,
    Game1,
    Game2,
    Game3,
    Game4,
    Game5,
    Game6,
    Game7,
    Game1,
    Game2,
    Game3,
    Game4,
    Game5,
  ];

  const gridGames = [
    "Wordle 5",
    "Wordle 6",
    "Wordle 7",
    "Dordle",
    "Quordle",
    "Lewdle",
    "Sweardle",
    "Nerdle",
    "Mathler",
    "Primel",
    "Mathle",
    "Numble",
    "Reversle",
    "Crosswordle",
    "Absurdle",
    "Evil Wordle",
    "Hardle",
    "Squabble",
    "Word Duel",
    "World Cup",
    "Hurdle",
    "Gameboy Worlde",
    "Bytle",
    "Hexle",
    "Taylordle",
    "Letterle",
    "Worldle",
    "Globle",
    "Heardle",
    "Don't Wordle",
  ];

  const [gameModal, setGameModal] = useState(false);
  const [gameConfig, setGameConfig] = useState({
    title: "",
    content: "",
    gridItem: 0,
    url: "",
    index: 0,
  });

  const links = [
    "wordle",
    "wordle",
    "wordle",
    "Dordle",
    "Quordle",
    "Lewdle",
    "Sweardle",
    "Nerdle",
    "Mathler",
    "Primel",
    "Mathle",
    "Numble",
    "Reversle",
    "Crosswordle",
    "Absurdle",
    "Evil Wordle",
    "Hardle",
    "Squabble",
    "Word Duel",
    "World Cup",
    "Hurdle",
    "Gameboy Worlde",
    "Bytle",
    "Hexle",
    "Taylordle",
    "Letterle",
    "Worldle",
    "Globle",
    "Heardle",
    "Don't Wordle",
  ];

  const content = [
    "The classic Wordle with 5 letters.",
    "The classic Wordle with 6 letters.",
    "The classic Wordle with 7 letters.",
    "Two wordle games at once.",
    "Four wordle games at once.",
    "Like wordle but with lewd words.",

    "Swear word guessing game.",
    "Like wordle but with equations.",
    "Find the hidden calculation that equals 128.",
    "Guess the prime number in 6 tries.",
    "Guess the exact addition or subtraction in 5 tries.",
    "Wordle for maths nerds.",

    "The answer is already given, guess the missing words as fast as possible.",
    "Sodoku meets wordle.",
    "Adversarial version of wordle (unlimited guesses).",
    "Another adversarial version of wordle.",
    "Wordle but the colour of the hints is not known.",
    "Multiplayer wordle royale.",

    "Competitive or casual wordle with friends.",
    "Multiplayer wordle with time-based rounds.",
    "Wordle but with different scoring (similar to 'mastermind' boardgame).",
    "Wordle but with a GameBoy style interface.",
    "Guess the unsigned 8-bit binary number.",
    "Guess the unsigned 16-bit number in hexadecimal.",

    "Taylor Swift inspired.",
    "Guess the correct letter.",
    "Guess the country/territory from the image.",
    "Guess the country from the image.",
    "Guess the song from the first few seconds.",
    "Like wordle but the opposite (goal is to not guess the word).",
  ];

  function openModal(item: number, index: number) {
    setGameConfig({
      title: gridGames[index],
      content: content[index],
      url: links[index],
      gridItem: item,
      index: index,
    });
    setGameModal(true);
  }

  return (
    <Box fontFamily={"quicksand"} marginY={{ lg: "2rem" }}>
      <GameEntryModal
        open={gameModal}
        close={() => setGameModal(false)}
        title={gameConfig.title}
        gridItem={gameConfig.gridItem}
        index={gameConfig.index}
        content={gameConfig.content}
        url={gameConfig.url}
      />
      <Box
        bgColor={theme.fgColor}
        display={"flex"}
        p={{ base: "0", md: "8", xl: "16" }}
        rowGap={"2rem"}
        flexDirection="column"
        borderRadius={"2xl"}
        color="#fbd6d2"
      >
        <Flex flexDirection={"column"} p={{ base: "2" }}>
          <Text fontSize={"3xl"} fontWeight="bold">
            Welcome to Axle
          </Text>
          <Text fontWeight={"bold"}>Web3 Games, NFT, Community & Earnings</Text>
        </Flex>
        <Flex flexDirection={"column"}>
          <Box
            bgColor={theme.secondaryColor}
            fontWeight="bold"
            p={{ base: "4" }}
            borderTopRadius={"2xl"}
            width={{ base: "80%", md: "60%", lg: "30%", xl: "20%" }}
            borderTopLeftRadius={{ base: "2xl" }}
            textAlign="center"
          >
            <Text>Axle Web3 Games</Text>
          </Box>
          <Box
            bgColor={theme.secondaryColor}
            p={{ base: "4" }}
            borderBottomRadius={"2xl"}
            borderTopRightRadius={{ base: "2xl" }}
          >
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
                "2xl": "repeat(4, 1fr)",
              }}
              gap={6}
            >
              {gridItems.map((grid, index) => (
                <GridItem
                  position={"relative"}
                  key={index}
                  w="100%"
                  h="52"
                  backgroundSize={"cover"}
                  backgroundRepeat={"no-repeat"}
                  borderRadius={"2xl"}
                >
                  <Image
                    w="100%"
                    h="52"
                    zIndex={0}
                    position={"absolute"}
                    src={images[index]}
                    borderRadius={"2xl"}
                    _hover={{
                      transform: "scale(1.05)",
                      transition: "200ms all ease-in",
                    }}
                  />
                  <Box
                    display={"flex"}
                    justifySelf="center"
                    alignSelf={"center"}
                    position="absolute"
                    zIndex={1}
                  >
                    <Box
                      p="2"
                      m="2"
                      bg={theme.secondaryColor}
                      borderRadius={"md"}
                    >
                      <Text zIndex={2} fontWeight={"bold"} fontSize="smaller">
                        {gridGames[index]}
                      </Text>
                    </Box>
                  </Box>

                  {grid === 0 ? (
                    <Box
                      position={"absolute"}
                      fontSize="smaller"
                      bottom="2"
                      right={"2"}
                    >
                      <Box
                        bg={theme.secondaryColor}
                        px={"3"}
                        py="2"
                        borderRadius={"md"}
                      >
                        <Text fontWeight={"bold"}>Coming Soon</Text>
                      </Box>
                    </Box>
                  ) : (
                    <Box position={"absolute"} bottom="2" right={"2"}>
                      <Button
                        variant={"ghost"}
                        _hover={{
                          color: theme.bgColor,
                          bg: theme.highLightColor,
                        }}
                        bg={theme.secondaryColor}
                        onClick={() => openModal(grid, index)}
                      >
                        <Box>Play Now</Box>
                      </Button>
                    </Box>
                  )}
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default GamesLayout;
