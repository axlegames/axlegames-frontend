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
import TimerButton from "../../Games/hooks/TimerButton";
import TimerButtonForSpecialGame from "../../Games/hooks/TimerButtonForSpecialGame";
import { AxleContest } from "../HomeServices";
import Hot from "../../../assets/gamein/promotional.png";
import Free from "../../../assets/gamein/free.png";
import ParticipantCountAndPrizePoolSocket from "./ParicipantAndPrizePoolSocket";
import EntryCardTimer from "./EntryCardTimer";

interface Props {
  contest: AxleContest;
  currentTime: string;
  action: Function;
  name: string;
  index: number;
}

const EntryCard = (props: Props) => {
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
      backgroundImage={`radial-gradient(circle, #1442b5, #003b96, #003376, #002956, #061e37)`}
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
        <EntryCardTimer
          gameType={props.contest.gameType}
          currentTime={props.currentTime}
          expiresAt={props.contest.axleContestInfo?.expiresAt || ""}
          opensAt={props.contest.axleContestInfo?.opensAt || ""}
          startsOn={props.contest.axleContestInfo?.expiresAt || ""}
        />
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
            color={theme.secondaryTextColor}
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
          <Divider
            py={1}
            boxShadow={`-1p -1px 12px ${theme.bgColor}`}
            backgroundImage={`linear-gradient(to bottom, #eb6612, #ee2e4c, #d4007c, #9828a3, #1442b5)`}
            borderRadius={"xl"}
          />
          <GridItem fontFamily={"'Russo One', sans-serif"}>
            <Flex justifyContent={"space-between"}>
              <Text color={theme.secondaryTextColor}>Entry Fee</Text>

              <Text
                boxShadow={"lg"}
                bg={theme.bgColor}
                px={4}
                py={1}
                borderRadius="md"
              >
                {props.contest.axleContestInfo?.entryFee || 0}{" "}
              </Text>
            </Flex>
          </GridItem>

          <GridItem fontFamily={"'Russo One', sans-serif"}>
            <Flex justifyContent={"space-between"}>
              <Text color={theme.secondaryTextColor}>Prize Pool</Text>
              <Text
                boxShadow={"lg"}
                bg={theme.bgColor}
                px={4}
                py={1}
                borderRadius="md"
              >
                <ParticipantCountAndPrizePoolSocket
                  contestId={props.contest._id}
                  isParticipantCount={false}
                />
              </Text>
            </Flex>
          </GridItem>

          <Divider
            py={1}
            backgroundImage={`linear-gradient(to top, #eb6612, #ee2e4c, #d4007c, #9828a3, #1442b5)`}
            borderRadius={"xl"}
          />

          <GridItem>
            <Flex justifyContent={"flex-end"} alignItems="center">
              {specialContest ? (
                <TimerButtonForSpecialGame
                  contestName={props.contest.contestName}
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
                  contestName={props.contest.contestName}
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
            <ParticipantCountAndPrizePoolSocket
              contestId={props.contest._id}
              isParticipantCount={true}
            />
          </Text>
        </Box>
      ) : null}
    </Box>
  );
};

export default EntryCard;
