import { Box, Button, Divider, Flex, Grid, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import { ChallengeStatus } from "../ChallengerServices";

const Tag = (props: { name: string; value: string | number | boolean }) => {
  return (
    <Box>
      {props.value ? (
        <Flex
          fontFamily={"'Russo One', sans-serif"}
          columnGap={"1rem"}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Box>{props.name}</Box>
          <Box
            p={2}
            px={4}
            borderRadius={"md"}
            bg={theme.bgColor}
            color={theme.primaryTextColor}
            textAlign="right"
            fontWeight={"bold"}
            boxShadow="lg"
          >
            {props.value}
          </Box>
        </Flex>
      ) : null}
    </Box>
  );
};

const Status = (props: { challenges: ChallengeStatus[]; play: Function }) => {
  return (
    <Box
      my={10}
      mx={4}
      p={8}
      display={"flex"}
      flexDirection="column"
      rowGap={"1rem"}
      justifyContent="flex-start"
      zIndex={1000000000}
      bg={theme.bgColor}
      borderRadius="md"
    >
      <Box
        display={"grid"}
        gridTemplateColumns="1fr"
        width={"100%"}
        justifyContent="center"
        alignItems={"center"}
        rowGap="1rem"
        columnGap="1rem"
      >
        {props.challenges.map((s, i) => (
          <Box
            cursor={"pointer"}
            p={2}
            borderRadius="md"
            bg={theme.fgColor}
            backgroundImage={`linear-gradient(to right top, #0e063d, #160d5d, #220f7e, #330fa0, #4609c3)`}
            boxShadow="lg"
            color={theme.secondaryTextColor}
            key={i}
            display={"flex"}
            flexDirection="column"
          >
            <Flex textAlign={"center"} justifyContent={"space-between"}>
              <Text
                fontFamily={"'Russo One', sans-serif"}
                fontSize={"xl"}
                color={theme.highLightColor}
              >
                Task #{i + 1}
              </Text>
              {s.isCompleted ? (
                <Text
                  borderRadius={"md"}
                  px={2}
                  color={theme.bgColor}
                  bg={"orange.400"}
                >
                  Done
                </Text>
              ) : (
                <Text
                  px={2}
                  borderRadius="md"
                  color={theme.bgColor}
                  bg={theme.warningColor}
                >
                  Pending
                </Text>
              )}
            </Flex>
            <Divider
              py={1}
              my={2}
              backgroundImage={`linear-gradient(to top, #eb6612, #ee2e4c, #d4007c, #9828a3, #1442b5)`}
              borderRadius={"xl"}
            />
            <Tag name={"No of Chances"} value={s.task?.noOfChances || false} />
            <Tag name={"Invites"} value={s.task?.invites || false} />
            <Text fontSize={"sm"}>{s.task?.task}</Text>

            <Divider
              py={1}
              my={2}
              backgroundImage={`linear-gradient(to top, #eb6612, #ee2e4c, #d4007c, #9828a3, #1442b5)`}
              borderRadius={"xl"}
            />
            <Grid
              gridTemplateColumns={"1fr 1fr 1fr"}
              rowGap="1rem"
              columnGap={"1rem"}
              my={3}
            >
              {s.task.contests.map((c, i) => (
                <Box
                  cursor={"pointer"}
                  p={2}
                  borderRadius="md"
                  bg={theme.bgColor}
                  backgroundImage={`linear-gradient(to right top, #0e063d, #160d5d, #220f7e, #330fa0, #4609c3)`}
                  color={theme.secondaryTextColor}
                  boxShadow="lg"
                  key={i}
                  rowGap=".25rem"
                  display={"flex"}
                  flexDirection="column"
                >
                  <Text
                    fontFamily={"'Russo One', sans-serif"}
                    fontSize={"xl"}
                    color={theme.primaryTextColor}
                  >
                    Contest #{i + 1}
                  </Text>
                  <Text
                    fontFamily={"'Russo One', sans-serif"}
                    fontSize={"sm"}
                    color={theme.highLightColor}
                  >
                    {c.link}
                  </Text>

                  <Divider
                    py={1}
                    my={2}
                    backgroundImage={`linear-gradient(to top, #eb6612, #ee2e4c, #d4007c, #9828a3, #1442b5)`}
                    borderRadius={"xl"}
                  />
                  <Box>
                    <Flex
                      columnGap={"1rem"}
                      textAlign="center"
                      fontFamily={"'Russo One', sans-serif"}
                      justifyContent="space-between"
                    >
                      <Box>Name</Box>
                      <Box
                        p={2}
                        minW="120px"
                        borderRadius={"md"}
                        bg={theme.bgColor}
                        color={theme.primaryTextColor}
                        textAlign="right"
                        fontWeight={"bold"}
                        boxShadow="lg"
                        fontSize={"sm"}
                      >
                        {c.contestName}
                      </Box>
                    </Flex>
                  </Box>
                  <Flex
                    columnGap={"1rem"}
                    textAlign="center"
                    justifyContent="space-between"
                    fontFamily={"'Russo One', sans-serif"}
                  >
                    <Box>Type</Box>
                    <Box
                      p={2}
                      minW="120px"
                      borderRadius={"md"}
                      bg={theme.bgColor}
                      color={theme.primaryTextColor}
                      textAlign="right"
                      fontWeight={"bold"}
                      boxShadow="lg"
                      fontSize={"sm"}
                    >
                      {c.gameType}
                    </Box>
                  </Flex>
                  <Divider
                    py={1}
                    my={2}
                    backgroundImage={`linear-gradient(to top, #eb6612, #ee2e4c, #d4007c, #9828a3, #1442b5)`}
                    borderRadius={"xl"}
                  />
                  <Flex
                    columnGap={"1rem"}
                    my={2}
                    justifyContent="space-between"
                  >
                    <Box></Box>
                    <Button
                      border="none"
                      outline={"none"}
                      bg={theme.bgColor}
                      fontFamily={"'Russo One', sans-serif"}
                      boxShadow="dark-lg"
                      color={theme.primaryTextColor}
                      variant={"outline"}
                      width="100%"
                      _hover={{
                        bg: theme.fgColor,
                      }}
                      onClick={() => props.play(c._id, c.link)}
                    >
                      Play
                    </Button>
                  </Flex>
                </Box>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Status;
