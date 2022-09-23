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

import Absurdle from "../../../assets/home/highlight/games/absurdle.png";
import AnitWordle from "../../../assets/home/highlight/games/anti_wordle.png";
import CrossWordle from "../../../assets/home/highlight/games/cross_wordle.png";
import Framed from "../../../assets/home/highlight/games/framed.png";
import Hurdle from "../../../assets/home/highlight/games/hurdle.png";

import Lewdle from "../../../assets/home/highlight/games/lewdle.png";
import Lookdle from "../../../assets/home/highlight/games/lookdle.png";
import Nerdle from "../../../assets/home/highlight/games/nerdle.png";
import Quordle from "../../../assets/home/highlight/games/quordle.png";
import Redrctle from "../../../assets/home/highlight/games/redrctle.png";
import Semantle from "../../../assets/home/highlight/games/semantle.png";
import SpellBound from "../../../assets/home/highlight/games/spellbound.png";
import Waffle from "../../../assets/home/highlight/games/waffle.png";
import WordScramble from "../../../assets/home/highlight/games/word_scramble.png";
import Wordle5 from "../../../assets/home/highlight/games/wordle5.png";
import Wordle7 from "../../../assets/home/highlight/games/wordle7.png";
import Wordle3 from "../../../assets/home/highlight/games/wordle3.png";

import GameEntryModal from "../modals/GameEntryModal";

const GamesLayout = () => {
  const gridItems = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const images = [
    Wordle5,
    Wordle3,
    Wordle7,
    Absurdle,
    AnitWordle,
    CrossWordle,
    Framed,
    Hurdle,
    Lewdle,
    Lookdle,
    Nerdle,
    Quordle,
    Redrctle,
    Semantle,
    SpellBound,
    Waffle,
    WordScramble,
  ];

  const gridGames = [
    "Wordle 5",
    "Wordles",
    "Wordle 7",
    "Absurdle",
    "Anti Wordle",
    "Cross Wordle",
    "Framed",
    "Hurdle",
    "Lewdle",
    "Lookdle",
    "Nerdle",
    "Quordle",
    "Redrctle",
    "Semantle",
    "Spell Bound",
    "Waffle",
    "WordScramble",
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
        color={theme.primaryColor}
      >
        <Flex flexDirection={"column"} p={{ base: "2" }}>
          <Text fontSize={"3xl"} fontWeight="bold">
            Welcome to Axle
          </Text>
          <Text color={theme.highLightColor} fontWeight={"bold"}>
            Web3 Games, NFT, Community & Earnings
          </Text>
        </Flex>
        <Flex flexDirection={"column"}>
          <Box
            bgColor={theme.primaryColor}
            color={theme.highLightColor}
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
            bgColor={theme.primaryColor}
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
                  backgroundSize={"cover"}
                  backgroundRepeat={"no-repeat"}
                  borderRadius={"2xl"}
                >
                  <Image
                    zIndex={0}
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
                    zIndex={2}
                    top="0"
                  >
                    <Box p="2" m="2" bg={theme.bgColor} borderRadius={"md"}>
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
                          bg: theme.fgColor,
                        }}
                        bg={theme.bgColor}
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
