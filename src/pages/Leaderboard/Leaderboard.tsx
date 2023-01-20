import {
  Box,
  Divider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { theme } from "../../config/theme.config";
import MainLayout from "../../layouts/MainLayout";

const data = [
  {
    username: "zoro",
    completedIn: "1",
    chances: 3,
  },
  {
    username: "goku77",
    completedIn: "84",
    chances: 4,
  },
  {
    username: "eren21",
    completedIn: "92",
    chances: 3,
  },
  {
    username: "mikasa2",
    completedIn: "221",
    chances: 5,
  },
  {
    username: "gohan3",
    completedIn: "18",
    chances: 3,
  },
  {
    username: "yamacha",
    chances: 2,
    completedIn: "32",
  },
  {
    username: "krelin88",
    completedIn: "222",
    chances: 4,
  },
  {
    username: "vegeta",
    completedIn: "22",
    chances: 4,
  },
  {
    username: "rico",
    completedIn: "221",
    chances: 4,
  },
  {
    username: "luffy",
    completedIn: "21",
    chances: 4,
  },
  {
    username: "robin",
    completedIn: "21",
    chances: 4,
  },
];

const Leaderboard = () => {
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
              <Text color={theme.primaryTextColor} fontSize="2xl">
                Winners Wordle #5 Contest
              </Text>
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
                    {data.map((d, i) => (
                      <Tr
                        bg={i % 2 !== 0 ? theme.fgColor : theme.bgColor}
                        key={i}
                        border={`4px solid ${theme.bgColor}`}
                      >
                        <Td border="none">{i + 1}</Td>
                        <Td border={"none"}>{d.username}</Td>
                        <Td border={"none"}>{d.chances}</Td>
                        <Td border={"none"}>{d.completedIn}s</Td>
                        <Td border={"none"}>4000 $AXLE</Td>
                      </Tr>
                    ))}
                  </Tbody>
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
