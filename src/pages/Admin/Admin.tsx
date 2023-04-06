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
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { theme } from "../../config/theme.config";
import { ChallengeServices } from "../DashBoard/ChallengerServices";

const Admin = () => {
  const navigate = useNavigate();
  function get7Day(createdAt: string) {
    const day7Plus = new Date(
      new Date(createdAt).getTime() + 1000 * 60 * 60 * 24 * 7
    );
    return moment(day7Plus).endOf("D").fromNow(); // in 8 hours
  }
  const toast = useToast();

  const updateChallenge = (challengeId: string) => {
    ChallengeServices.updateChallenge(challengeId)
      .then((c) => {
        console.log(c);
        return toast({
          title: "Updated",
          description: "all challenger status updated",
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

  const getWinners = (challengeId: string) => {
    return navigate(`/admin/winners/${challengeId}`);
  };

  useEffect(() => {
    ChallengeServices.getChallenges()
      .then((res) => {
        console.log(res);
        setChallenges(res.challenges);
      })
      .catch((err) => console.log(err));
  }, []);

  const [challenges, setChallenges] = useState([]) as any;
  const heading = [
    "sno",
    "entry fee",
    "game",
    "tasks",
    "participants",
    "expires in",
    "type",
    "options",
  ];

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
            {challenges.map((c: any, i: number) => (
              <Tr key={i} bg={theme.bgColor}>
                <Td fontWeight={"bold"} color={theme.primaryTextColor}>
                  {i + 1}
                </Td>
                <Td fontWeight={"bold"} color={theme.primaryTextColor}>
                  {c.entryFee}
                </Td>

                <Td fontWeight={"bold"} color={theme.primaryTextColor}>
                  {c.game}
                </Td>
                <Td fontWeight={"bold"} color={theme.primaryTextColor}>
                  {c.tasks.length}
                </Td>
                <Td fontWeight={"bold"} color={theme.primaryTextColor}>
                  {c.participants.length}
                </Td>
                <Td fontWeight={"bold"} color={theme.primaryTextColor}>
                  {get7Day(c.createdAt)}
                </Td>
                <Td fontWeight={"bold"} color={theme.primaryTextColor}>
                  {c.challengeType}
                </Td>
                <Td>
                  <Flex columnGap={"1rem"}>
                    <Button onClick={() => updateChallenge(c._id)} size="sm">
                      update winners
                    </Button>
                    <Button onClick={() => getWinners(c._id)} size="sm">
                      show winners
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

export default Admin;
