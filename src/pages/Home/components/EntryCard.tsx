import { Box, Text, Grid, GridItem, Flex } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import Timer from "../../Games/hooks/Timer";
import TimerButton from "../../Games/hooks/TimerButton";
import { GameType } from "../enums/contests.enum";
import { AxleContest } from "../HomeServices";

interface Props {
  contest: AxleContest;
  currentTime: string;
  action: Function;
  name: string;
}

const EntryCard = (props: Props) => {
  const toStringGameType = (gameType: GameType) => {
    return gameType.valueOf().toString();
  };
  const gameType = props.contest.gameType.valueOf().toString();
  const type = gameType === toStringGameType(GameType.PRACTICE);

  const TimeComponent = () => {
    return !type ? (
      <Box>
        <Timer
          currentTime={props.currentTime}
          opensAt={props.contest.axleContestInfo?.opensAt || ""}
          deadline={props.contest.axleContestInfo?.expiresAt || ""}
          startsOn={props.contest.axleContestInfo?.startsOn || ""}
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
          bg={theme.modalBgColor}
          color={theme.primaryTwoTextColor}
          px={2}
          borderRadius="md"
          position="absolute"
          boxShadow={`6px 6px 21px #1a192e, -6px -6px 21px #322f56`}
        >
          Free
        </Text>
      ) : (
        <Text
          zIndex={1}
          top={-3}
          left={-3}
          my={1}
          bg={theme.modalBgColor}
          color={theme.primaryTwoTextColor}
          px={2}
          borderRadius="md"
          position="absolute"
          boxShadow={`6px 6px 21px #1a192e, -6px -6px 21px #322f56`}
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
        bg={theme.modalBgColor}
        color={theme.primaryTwoTextColor}
        px={2}
        borderRadius="md"
        position="absolute"
        boxShadow={`6px 6px 21px #1a192e, -6px -6px 21px #322f56`}
      >
        <TimeComponent />
      </Box>
      <Box
        boxShadow={`inset 6px 6px 21px #1a192e, inset -6px -6px 21px #322f56`}
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
              <Text> {props.contest.axleContestInfo?.entryFee} </Text>
            </Flex>
          </GridItem>

          <GridItem>
            <Flex direction={"column"}>
              <Text>Prize</Text>
              <Text>{props.contest.axleContestInfo?.prizePool}</Text>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex justifyContent={"flex-end"}>
              <TimerButton
                contestId={props.contest._id}
                name={props.name}
                status={props.contest.status}
                gameType={props.contest.gameType.valueOf().toString()}
                action={props.action}
                opensAt={props.contest.axleContestInfo?.opensAt || ""}
                deadline={props.contest.axleContestInfo?.expiresAt || ""}
                startsIn={props.contest.axleContestInfo?.startsOn || ""}
                currentTime={props.currentTime}
              />
            </Flex>
          </GridItem>
        </Grid>
      </Box>
      {props.contest.status ? (
        <Box
          borderBottomRadius={"lg"}
          boxShadow={`0px 0px 4px ${theme.secondaryTwoTextColor}`}
          p="2"
        >
          <Text color={theme.primaryTextColor} fontSize={"smaller"}>
            {props.contest.axleContestants.length} + playing now
          </Text>
        </Box>
      ) : null}
    </Box>
  );
};

export default EntryCard;
