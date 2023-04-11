import { theme } from "../../../config/theme.config";
import { PlayerStats } from "../GameServices";
import { Box, Divider, Flex, Grid, Text } from "@chakra-ui/react";

import Lottie from "lottie-react";
import NeuButton from "../../Axle/component/NeuButton";
import Lost from "../../../assets/wordle/lottie/little-boy-crying.json";

interface Props {
  stats: PlayerStats;
  shareResult: Function;
  isGuest?: boolean;
  isPractice: boolean;
}

const LostModal = (props: Props) => {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      justifyContent={"center"}
      alignItems="center"
      rowGap={"1rem"}
      color={theme.highLightColor}
    >
      {props.isGuest || props.isPractice ? (
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
              <Text fontSize={"2xl"}>
                {props.stats.currentStreak.toFixed(2)}
              </Text>
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
        display={"flex"}
        alignItems="center"
        justifyContent="center"
        flexDirection={"column"}
      >
        <Box maxW={"xs"} maxH={"xs"}>
          <Lottie animationData={Lost} loop={false} />
        </Box>
        <Text fontSize="2xl">Oh! better luck next time</Text>
      </Box>
      <Divider />
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
export default LostModal;
