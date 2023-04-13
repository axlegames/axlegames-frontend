import {
  Box,
  Text,
  Grid,
  GridItem,
  Flex,
  Image,
  Divider,
  Button,
} from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import { AxleContest } from "../HomeServices";
import Hot from "../../../assets/gamein/promotional.png";
import Free from "../../../assets/gamein/free.png";
import ParticipantCountAndPrizePoolSocket from "./ParicipantAndPrizePoolSocket";

interface Props {
  contest: AxleContest;
  currentTime: string;
  action: Function;
  name: string;
  index: number;
}

const AIEntryCard = (props: Props) => {
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
      backgroundImage={`linear-gradient(to right top, #0e063d, #160d5d, #220f7e, #330fa0, #4609c3)`}
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
                {props.contest.axleContestInfo?.entryFee || `FREE`}
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
                {props.contest.gameType === "PRACTICE" ? (
                  `FREE`
                ) : (
                  <ParticipantCountAndPrizePoolSocket
                    contestId={props.contest._id}
                    isParticipantCount={false}
                  />
                )}
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
              <Button
                color="black"
                border="none"
                outline={"none"}
                transition={`all`}
                boxShadow={`3px 3px 12px ${theme.bgColor}`}
                size="sm"
                bg={"#03C988"}
                transitionDuration={"200ms"}
                transitionTimingFunction="ease-in-out"
                width={"36"}
                _hover={{
                  bg: "#3CCF4E",
                }}
                onClick={() => props.action()}
              >
                Play
              </Button>
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
          <Box
            fontFamily={"'Russo One', sans-serif"}
            color={theme.primaryTextColor}
            fontSize={"smaller"}
          >
            {props.contest.gameType === "PRACTICE" ? (
              <Box>{Math.floor(Math.random() * 24)}+ playing now</Box>
            ) : (
              <ParticipantCountAndPrizePoolSocket
                contestId={props.contest._id}
                isParticipantCount={true}
              />
            )}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default AIEntryCard;
