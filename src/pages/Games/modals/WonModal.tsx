import { Box, Divider, Flex, Grid, Text } from "@chakra-ui/react";

import { theme } from "../../../config/theme.config";
import { PlayerStats } from "../GameServices";

import Lottie from "lottie-react";
import NeuButton from "../../Axle/component/NeuButton";
import Won from "../../../assets/wordle/lottie/little-boy-with-thumbs-up.json";

interface Props {
  stats: PlayerStats;
  shareResult: Function;
  result: Array<Array<string>>;
  isGuest: boolean;
  isAIWordle: boolean;
  tries: number;
  letter: number;
  isContest: string;
}

const WonModal = (props: Props) => {
  const getColor = (key: string) => {
    if (key === "absent") return "gray.200";
    if (key === "present") return "yellow.400";
    if (key === "correct") return "green.400";
    return "gray.200";
  };

  const wp = (props.stats.winPercent || 0).toFixed(2);
  const s = (props.stats.currentStreak || 0).toFixed(2);
  const ms = (props.stats.maxStreak || 0).toFixed(2);

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      rowGap={"1rem"}
      color={theme.highLightColor}
    >
      <Text fontSize={{ base: "xl" }}>
        You have won {props.letter} letter AI wordle in {props.tries} tries.
      </Text>
      <Divider></Divider>
      {props.isGuest || props.isContest !== "true" ? null : (
        <Box>
          <Text fontSize={"xl"} textAlign={"center"}>
            Statistics
          </Text>
          <Grid
            fontFamily={`'Russo One', sans-serif`}
            my={4}
            gridTemplateColumns={`1fr 1fr 1fr 1fr`}
            justifyContent={"space-between"}
          >
            <Box
              display={"flex"}
              justifyContent="center"
              flexDirection={"column"}
              alignItems="center"
            >
              <Text fontSize={"2xl"}>{props.stats.played}</Text>
              <Text>Played</Text>
            </Box>
            <Box
              display={"flex"}
              justifyContent="center"
              alignItems="center"
              flexDirection={"column"}
            >
              <Text fontSize={"2xl"}>{wp}</Text>
              <Text>Win %</Text>
            </Box>
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent="center"
              flexDirection={"column"}
            >
              <Text fontSize={"2xl"}>{s}</Text>
              <Text>Streak</Text>
            </Box>
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent="center"
              flexDirection={"column"}
            >
              <Text fontSize={"2xl"}>{ms}</Text>
              <Text>Max Streak</Text>
            </Box>
          </Grid>
        </Box>
      )}
      <Box>
        {props.isGuest || props.isContest !== "true" ? (
          <Box
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            width="100%"
            mx="auto"
            maxW={"220px"}
            maxH={"220px"}
            flexDirection="column"
          >
            <Lottie animationData={Won} loop={false} />
          </Box>
        ) : null}
        {props.isAIWordle ? null : (
          <Box
            justifyContent={"center"}
            display={"flex"}
            rowGap={".2rem"}
            flexDirection="column"
            alignItems={"center"}
          >
            {props.result.map((word, i) => (
              <Box columnGap=".2rem" display={"flex"} key={i}>
                {word.map((letter, j) => (
                  <Box
                    height={"8"}
                    width={"8"}
                    borderRadius="md"
                    key={i}
                    bg={getColor(letter)}
                  ></Box>
                ))}
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Divider></Divider>
      {/* <Box
        display={"flex"}
        alignItems="center"
        justifyContent="center"
        flexDirection={"column"}
      >
        <Box maxW={"xs"} maxH={"xs"}>
          <Lottie animationData={Won} loop={false} />
        </Box>
        <Text fontSize="2xl">Congrats! you have won</Text>
      </Box> */}
      {/* <Divider /> */}
      <Text> Click on the share button and win exciting rewards</Text>
      <Flex justifyContent={"flex-end"}>
        <NeuButton
          bg={theme.neuPrimaryBg}
          label="Share Result"
          shadow={theme.newPrimaryShadow}
          onClick={() => props.shareResult()}
        />
      </Flex>
    </Box>
  );
};
export default WonModal;
