import { Box, Text, Grid, GridItem, Flex, Divider } from "@chakra-ui/react";
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
  const type =
    gameType === toStringGameType(GameType.PRACTICE) ||
    gameType === toStringGameType(GameType.GAMIN_NIGHTS);

  const TimeComponent = () => {
    return !type || gameType === toStringGameType(GameType.GAMIN_NIGHTS) ? (
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

  const dayGetter = () => {
    const day = new Date(Date.now()).getDay();
    if (day === 1) return "Monday";
    if (day === 2) return "Tuesday";
    if (day === 3) return "Wednesday";
    if (day === 4) return "Thursday";
    if (day === 5) return "Friday";
    if (day === 6) return "Saturday";
    if (day === 7) return "Sunday";
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
        {gameType === "GAMIN_NIGHTS" ? (
          <Box>
            <Divider my={4} />
            <Text fontSize={"lg"} fontWeight="bold">
              {dayGetter()} {`Gaming Night Contest!`}
            </Text>
            <Divider my={4} />
          </Box>
        ) : null}
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
