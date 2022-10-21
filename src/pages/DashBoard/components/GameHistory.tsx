import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { theme } from "../../../config/theme.config";
import { DashBoardServices, GameHistoryModel } from "../DashBoardServices";

const GameHistory = () => {
  const [history, setHistory] = useState<{ history: Array<GameHistoryModel> }>({
    history: [],
  });

  useEffect(() => {
    DashBoardServices.getGameHistory().then((res) => {
      setHistory({ history: res });
    });
  }, []);

  return (
    <Flex
      justifyContent={"flex-start"}
      shadow="xl"
      height={"100%"}
      borderRadius={"xl"}
      direction="column"
      p={4}
      bg={theme.bgColor}
      aria-expanded="false"
      display={{ base: "none", md: "flex" }}
    >
      <Flex justifyContent={"space-between"}>
        <Flex fontWeight={"bold"} direction={"column"}>
          <Text fontSize={"3xl"} color={theme.primaryTextColor}>
            Your History
          </Text>
        </Flex>
        <Button
          bg={theme.ternaryButtonColor}
          color={theme.secondaryTwoTextColor}
          size="sm"
        >
          View all
        </Button>
      </Flex>
      <TableContainer aria-expanded="false" my={4}>
        <Table
          fontFamily={"quicksand"}
          fontWeight="bold"
          color={theme.secondaryTextColor}
          variant="simple"
        >
          <Thead>
            <Tr
              borderBottom="none"
              borderLeft="none"
              borderRight={"none"}
              borderTop="none"
            >
              <Th
                fontFamily="quicksand"
                color={theme.secondaryTwoTextColor}
                fontSize={"md"}
              >
                Game
              </Th>
              <Th
                fontFamily="quicksand"
                color={theme.secondaryTwoTextColor}
                fontSize={"md"}
              >
                Fee
              </Th>
              <Th
                fontFamily="quicksand"
                color={theme.secondaryTwoTextColor}
                fontSize={"md"}
              >
                Reward
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {history.history.map((d, i) => (
              <Tr
                key={i}
                borderBottom={`2px solid ${theme.primaryTwoTextColor}`}
                borderLeft="none"
                borderRight={"none"}
                borderTop="none"
                position={"relative"}
              >
                <Td>
                  {d.gameType === "0" ? (
                    <Text
                      zIndex={1}
                      left={1}
                      top={0}
                      bg={theme.ternaryButtonColor}
                      color={theme.primaryTwoTextColor}
                      px={1}
                      transform={`rotate(-20deg)`}
                      borderRadius="xl"
                      fontSize={"10px"}
                      position="absolute"
                      boxShadow={`0px 0px 2px ${theme.primaryTwoTextColor}`}
                    >
                      Free
                    </Text>
                  ) : null}
                  <Text zIndex={2}>{d.game}</Text>
                </Td>
                <Td>{d.fee} AXLE</Td>
                <Td>{d.reward} AXLE</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};
export default GameHistory;
