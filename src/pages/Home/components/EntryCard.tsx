import { Box, Text, Grid, GridItem, Flex } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import Timer from "../../Wordle/hooks/Timer";
import TimerButton from "../../Wordle/hooks/TimerButton";
import { GameType } from "../enums/contests.enum";
import { AxleContest } from "../HomeServices";

const EntryCard = (props: AxleContest) => {
  const toStringGameType = (gameType: GameType) => {
    return gameType.valueOf().toString();
  };
  const gameType = props.gameType.valueOf().toString();
  const type = gameType === toStringGameType(GameType.PRACTICE);

  const TimeComponent = () => {
    return !type ? (
      <Box>
        <Timer
          opensAt={props.axleContestInfo?.opensAt || ""}
          deadline={props.axleContestInfo?.expiresAt || ""}
          startsOn={props.axleContestInfo?.startsOn || ""}
        />
      </Box>
    ) : null;
  };

  return (
    <Box position="relative" boxShadow={"md"}>
      {type ? (
        <Text
          zIndex={1}
          top={-3}
          left={-3}
          my={1}
          bg={theme.ternaryButtonColor}
          color={theme.primaryTwoTextColor}
          px={2}
          borderRadius="sm"
          position="absolute"
          boxShadow={`0px 0px 2px ${theme.primaryTwoTextColor}`}
        >
          Free
        </Text>
      ) : (
        <Text
          zIndex={1}
          top={-3}
          left={-3}
          my={1}
          bg={theme.ternaryButtonColor}
          color={theme.primaryTwoTextColor}
          px={2}
          borderRadius="sm"
          position="absolute"
          boxShadow={`0px 0px 2px ${theme.primaryTwoTextColor}`}
        >
          Paid
        </Text>
      )}
      <Box
        zIndex={1}
        bottom={-3}
        mx={"auto"}
        left={"50%"}
        my={1}
        bg={theme.ternaryButtonColor}
        color={theme.primaryTwoTextColor}
        px={2}
        borderRadius="sm"
        position="absolute"
        boxShadow={`0px 0px 2px ${theme.primaryTwoTextColor}`}
      >
        <TimeComponent />
      </Box>
      <Box
        boxShadow={`0px 0px 4px ${theme.secondaryTwoTextColor}`}
        borderTopRadius="lg"
        p={"4"}
      >
        <Grid
          templateColumns="1fr 1fr 2fr"
          alignItems={"center"}
          fontSize={"md"}
          gap={6}
        >
          <GridItem>
            <Flex direction={"column"}>
              <Text>Entry Fee</Text>
              <Text> {props.axleContestInfo?.entryFee} </Text>
            </Flex>
          </GridItem>

          <GridItem>
            <Flex direction={"column"}>
              <Text>Prize</Text>
              <Text>{props.axleContestInfo?.prizePool}</Text>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex justifyContent={"flex-end"}>
              <TimerButton
                gameType={props.gameType.valueOf().toString()}
                action={props.action}
                opensAt={props.axleContestInfo?.opensAt || ""}
                deadline={props.axleContestInfo?.expiresAt || ""}
                startsIn={props.axleContestInfo?.startsOn || ""}
              />
            </Flex>
          </GridItem>
        </Grid>
      </Box>
      {props.status ? (
        <Box
          borderBottomRadius={"lg"}
          boxShadow={`0px 0px 4px ${theme.secondaryTwoTextColor}`}
          p="2"
        >
          <Text color={theme.primaryTextColor} fontSize={"smaller"}>
            {props.axleContestants.length} + playing now
          </Text>
        </Box>
      ) : null}
    </Box>
  );
};

export default EntryCard;
