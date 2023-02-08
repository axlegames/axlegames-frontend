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
    <Box
      justifyContent="center"
      position="relative"
      boxShadow={"xl"}
      backgroundImage={
        specialContest
          ? `linear-gradient(to right top, #061e37, #072340, #072849, #082d52, #0a325c)`
          : `linear-gradient(to left top, #061e37, #072340, #072849, #082d52, #0a325c)`
      }
      borderRadius="md"
    >
      {specialContest ? (
        <Box
          zIndex={1}
          top={-6}
          left={-3}
          my={1}
          position="absolute"
          transform={`rotate(45deg)`}
        >
          <Image height="64px" width="64px" src={Hot} />
        </Box>
      ) : (
        <Box
          zIndex={1}
          top={-6}
          left={-3}
          my={1}
          borderRadius="md"
          position="absolute"
        >
          <Image height="64px" width="64px" src={Free} />
        </Box>
      )}
      <Box
        zIndex={1}
        bottom={-3}
        mx={"auto"}
        left={"50%"}
        my={1}
        color={theme.primaryTwoTextColor}
        borderRadius="sm"
        position="absolute"
        bg={theme.bgColor}
        px={4}
        boxShadow={`0px 0px 4px ${theme.primaryTwoTextColor}`}
      >
        <TimeComponent />
      </Box>

      <Box borderTopRadius="lg" p={"4"}>
        <Grid
          rowGap={"1rem"}
          templateColumns="1fr"
          alignItems={"center"}
          color={theme.primaryTextColor}
          fontSize={"md"}
          width="100%"
        >
          <Box
            display={"flex"}
            justifyContent="flex-end"
            fontFamily={"'Russo One', sans-serif"}
            color={theme.primaryTwoTextColor}
            fontSize={"xl"}
            fontWeight="bold"
          >
            {specialContest ? (
              <Text>
                {dayGetter()} {`Gaming Night!`}
              </Text>
            ) : (
              <Text>Practice</Text>
            )}
          </Box>
          <Divider />
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

          <GridItem>
            <Flex justifyContent={"flex-end"} alignItems="center">
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
          boxShadow={`0px 0px 4px ${theme.primaryTwoTextColor}`}
          borderBottomRadius={"lg"}
          p="2"
        >
          <Text
            fontFamily={"'Russo One', sans-serif"}
            color={theme.primaryTextColor}
            fontSize={"smaller"}
          >
            {props.contest.axleContestants.length} + playing now
          </Text>
        </Box>
      ) : null}
    </Box>
  );
};

export default EntryCard;
