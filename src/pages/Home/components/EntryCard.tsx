import {
  Box,
  Text,
  Grid,
  GridItem,
  Flex,
  Image,
  Divider,
} from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import Timer from "../../Games/hooks/Timer";
import TimerButton from "../../Games/hooks/TimerButton";
import TimerButtonForSpecialGame from "../../Games/hooks/TimerButtonForSpecialGame";
import { GameType } from "../enums/contests.enum";
import { AxleContest } from "../HomeServices";
import Hot from "../../../assets/gamein/promotional.png";
import Free from "../../../assets/gamein/free.png";

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

  const specialContest = props.contest.gameType === "GAMIN_NIGHTS";

  return (
    <Box position="relative" boxShadow={"md"}>
      {specialContest ? (
        <Text
          zIndex={1}
          bottom={-3}
          right={-3}
          my={1}
          color={theme.primaryTwoTextColor}
          borderRadius="md"
          position="absolute"
          transform={`rotate(45deg)`}
        >
          <Image height="52px" width="52px" src={Hot} />
        </Text>
      ) : (
        <Text
          zIndex={1}
          bottom={-3}
          right={-3}
          my={1}
          color={theme.primaryTwoTextColor}
          borderRadius="md"
          position="absolute"
        >
          <Image height="52px" width="52px" src={Free} />
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
          rowGap={"1rem"}
          templateColumns="1fr"
          alignItems={"center"}
          fontSize={"md"}
          width="100%"
        >
          <GridItem>
            <Flex justifyContent={"space-between"}>
              <Text>Entry Fee</Text>
              <Text> {props.contest.axleContestInfo?.entryFee || 0} </Text>
            </Flex>
          </GridItem>

          <GridItem>
            <Flex justifyContent={"space-between"}>
              <Text>Prize</Text>
              <Text>{props.contest.axleContestInfo?.prizePool || 0}</Text>
            </Flex>
          </GridItem>
          <Divider />
          <GridItem>
            <Flex
              color={theme.primaryTwoTextColor}
              fontSize={"sm"}
              fontWeight="bold"
              justifyContent={"space-between"}
              alignItems="center"
            >
              {specialContest ? (
                <Text>
                  {dayGetter()} {`Gaming Night Contest!`}
                </Text>
              ) : (
                <Text>Practice</Text>
              )}

              {specialContest ? (
                <TimerButtonForSpecialGame
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
              ) : (
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
              )}
            </Flex>
          </GridItem>
        </Grid>
      </Box>
      {props.contest.status ? (
        <Box
          borderBottomRadius={"lg"}
          boxShadow={`6px 6px 21px #1a192e, -6px -6px 21px #322f56`}
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
