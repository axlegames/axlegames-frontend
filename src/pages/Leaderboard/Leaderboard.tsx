import {
  Box,
  Divider,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { theme } from "../../config/theme.config";
import MainLayout from "../../layouts/MainLayout";
import { GameServices, LeaderboardInterface } from "../Games/GameServices";

const Leaderboard = () => {
  const [data, setData] = useState<Array<LeaderboardInterface>>([]);
  const params = useParams();

  useEffect(() => {
    const contestName = `${params.game?.toLocaleLowerCase()}-${
      params.contestId
    }`;
    GameServices.getContestLeaderboardResults(contestName)
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <Box bg={theme.bgColor}>
        <Box
          mx="auto"
          width={{ base: "100%", sm: "90%" }}
          display={"flex"}
          justifyContent="center"
          flexDirection={"column"}
          alignItems={"center"}
          fontFamily={"quicksand"}
          fontWeight="bold"
          rowGap={"2rem"}
        >
          <Text color={theme.primaryTextColor} fontSize={"3xl"}>
            Leaderboard
          </Text>

          <Box width={"100%"} display={"flex"} columnGap="1rem">
            <Box
              bg={theme.fgColor}
              borderRadius="md"
              width={"100%"}
              p={4}
              borderTopRadius="3xl"
            >
              <Box>
                <Text color={theme.primaryTextColor} fontSize="2xl">
                  Winners {params.game ? params.game.replace("-", " #") : ""}{" "}
                </Text>
                <Text color={theme.secondaryTextColor} fontSize="xl">
                  {params.contestId ? params.contestId.replace("-", " #") : ""}
                </Text>
              </Box>
              <Divider my={4} />
              <TableContainer>
                <Table
                  bg={theme.bgColor}
                  color={theme.secondaryTextColor}
                  borderRadius="2xl"
                  fontWeight={"bold"}
                  colorScheme={"green"}
                >
                  <Thead my={4} bg={theme.bgColor}>
                    <Tr>
                      <Th
                        color={theme.secondaryTwoTextColor}
                        borderTopLeftRadius={"2xl"}
                        fontFamily={"quicksand"}
                        fontWeight="bold"
                      >
                        Rank
                      </Th>
                      <Th
                        fontFamily={"quicksand"}
                        fontWeight="bold"
                        color={theme.secondaryTwoTextColor}
                      >
                        Username
                      </Th>

                      <Th
                        fontFamily={"quicksand"}
                        fontWeight="bold"
                        color={theme.secondaryTwoTextColor}
                        borderTopRightRadius={"2xl"}
                      >
                        Chances
                      </Th>
                      <Th
                        fontFamily={"quicksand"}
                        fontWeight="bold"
                        color={theme.secondaryTwoTextColor}
                        borderTopRightRadius={"2xl"}
                      >
                        Completed in
                      </Th>
                      <Th
                        fontFamily={"quicksand"}
                        fontWeight="bold"
                        color={theme.secondaryTwoTextColor}
                        borderTopRightRadius={"2xl"}
                      >
                        Reward
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody mt={2}>
                    {data.map((d: LeaderboardInterface, i: number) => (
                      <Tr
                        bg={i % 2 !== 0 ? theme.fgColor : theme.bgColor}
                        key={i}
                        border={`4px solid ${theme.bgColor}`}
                      >
                        <Td border="none">{i + 1}</Td>
                        <Td border={"none"}>{d.username}</Td>
                        <Td border={"none"}>{d.chances}</Td>
                        <Td border={"none"}>{d.time}s</Td>
                        <Td border={"none"}>{d.reward} $AXLE</Td>
                      </Tr>
                    ))}
                  </Tbody>

                  <TableCaption borderBottomRadius={"2xl"}>
                    {data.length === 0 ? (
                      <Box display={"flex"} justifyContent="center">
                        <Text
                          fontFamily={"quicksand"}
                          color={theme.secondaryTextColor}
                          fontSize="xl"
                          textAlign={"center"}
                        >
                          Results will be updated soon.
                        </Text>
                      </Box>
                    ) : null}
                  </TableCaption>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Leaderboard;
