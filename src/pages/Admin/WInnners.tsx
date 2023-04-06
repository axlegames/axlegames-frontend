import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { theme } from "../../config/theme.config";
import { ChallengeServices } from "../DashBoard/ChallengerServices";

const Winners = () => {
  const toast = useToast();
  const params = useParams();

  useEffect(() => {
    ChallengeServices.getWinners(params.challengeId || "").then((res) => {
      console.log(res);
      setWinners(res.winners);
    });
  }, [params]);

  const sendReward = (challengerId: string, reward: number) => {
    ChallengeServices.sendReward({
      challengerId: challengerId,
      challengeId: params.challengeId || "",
      reward: reward,
    })
      .then((c) => {
        console.log(c);
        return toast({
          title: "Sent",
          description: "reward distributed",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        console.log(err);
        return toast({
          title: "Error",
          description: "some thing went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const [winners, setWinners] = useState([]) as any;
  const heading = ["sno", "participant", "challenge", "user", "options"];

  return (
    <Box>
      <TableContainer>
        <Table>
          <Thead>
            <Tr bg={theme.bgColor}>
              {heading.map((h, i) => (
                <Th
                  fontWeight={"bold"}
                  fontFamily={"quicksand"}
                  key={i}
                  color={theme.secondaryTextColor}
                >
                  {h}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {winners.map((c: any, i: number) => (
              <Tr key={i} bg={theme.bgColor}>
                <Td fontWeight={"bold"} color={theme.primaryTextColor}>
                  {i + 1}
                </Td>
                <Td fontWeight={"bold"} color={theme.primaryTextColor}>
                  {c.participant._id}
                </Td>
                <Td fontWeight={"bold"} color={theme.primaryTextColor}>
                  {c.participant.challengeId}
                </Td>
                <Td fontWeight={"bold"} color={theme.primaryTextColor}>
                  {c.participant.user}
                </Td>
                <Td>
                  <Flex columnGap={"1rem"}>
                    <Button
                      onClick={() => sendReward(c.participant._id, 2000)}
                      size="sm"
                    >
                      send reward
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Winners;
