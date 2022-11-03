import { Box, Text, Grid, GridItem, Button, Flex } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import { AxleContest, GameType } from "../HomeServices";
import { GameStatus } from "../modals/GameEntryModal";

const EntryCard = (props: AxleContest) => {
  return (
    <Box position="relative" boxShadow={"md"}>
      {Number(props.gameType.valueOf()) ===
      Number(GameType.PRACTICE.valueOf()) ? (
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
              {Number(props.status.valueOf()) ===
              Number(GameStatus.LIVE.valueOf()) ? (
                <Button
                  size="sm"
                  onClick={() => props.action()}
                  variant={"ghost"}
                  color="black"
                  bg={"green.400"}
                  w={"32"}
                >
                  Play
                </Button>
              ) : null}

              {Number(props.status.valueOf()) ===
              Number(GameStatus.NEXT.valueOf()) ? (
                <Button size="sm" width={"32"} color="black">
                  Comingsoon
                </Button>
              ) : null}

              {Number(props.status.valueOf()) ===
              Number(GameStatus.EXPIRED.valueOf()) ? (
                <Button size="sm" disabled={true} width={"32"} color="black">
                  Expired
                </Button>
              ) : null}
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
