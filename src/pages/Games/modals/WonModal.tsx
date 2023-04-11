import { Box, Divider, Flex, Grid, Text } from "@chakra-ui/react";

import { theme } from "../../../config/theme.config";
import NeuButton from "../../Axle/component/NeuButton";
import { PlayerStats } from "../GameServices";

interface Props {
  stats: PlayerStats;
  shareResult: Function;
  result: Array<Array<string>>;
  isGuest?: boolean;
}

const WonModal = (props: Props) => {
  const getColor = (key: string) => {
    if (key === "absent") return "gray.200";
    if (key === "present") return "yellow.400";
    if (key === "correct") return "green.400";
    return "gray.200";
  };

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      rowGap={"1rem"}
      color={theme.highLightColor}
    >
      {props.isGuest ? (
        <Box></Box>
      ) : (
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
              <Text fontSize={"2xl"}>{props.stats.winPercent.toFixed(2)}</Text>
              <Text>Win %</Text>
            </Box>
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent="center"
              flexDirection={"column"}
            >
              <Text fontSize={"2xl"}>{props.stats.currentStreak}</Text>
              <Text>Streak</Text>
            </Box>
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent="center"
              flexDirection={"column"}
            >
              <Text fontSize={"2xl"}>{props.stats.maxStreak}</Text>
              <Text>Max Streak</Text>
            </Box>
          </Grid>
        </Box>
      )}
      <Divider></Divider>
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
