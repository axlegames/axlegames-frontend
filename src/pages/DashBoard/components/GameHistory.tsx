import {
  Button,
  Flex,
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
import { useNavigate } from "react-router";
import { TokenAuthStatus } from "../../../config/auth";
import { theme } from "../../../config/theme.config";
import { DashBoardServices, GameHistoryModel } from "../DashBoardServices";
import DashBoardDialog from "../modal/DashBoardDialog";
import GameHistoryModal from "../modal/GameHistoryModal";

const GameHistory = () => {
  const [history, setHistory] = useState<{ history: Array<GameHistoryModel> }>({
    history: [],
  });

  const [tempHistory, setTempHistory] = useState<{
    history: Array<GameHistoryModel>;
  }>({
    history: [],
  });

  const navigate = useNavigate();
  const isAuthorized = (status: TokenAuthStatus) => {
    if (
      status.valueOf().toString() ===
      TokenAuthStatus.UNAUTHORIZED.valueOf().toString()
    ) {
      localStorage.clear();
      navigate("/");
      return window.location.reload();
    }
  };

  useEffect(() => {
    DashBoardServices.getGameHistory().then((res) => {
      isAuthorized(res as TokenAuthStatus);
      res = res as Array<GameHistoryModel>;
      if (res.length > 6) {
        setTempHistory({ history: res.slice(0, 6) });
      } else {
        setTempHistory({ history: res });
      }
      setHistory({ history: res });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [open, setOpen] = useState(false);

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
      <DashBoardDialog
        isOpen={open}
        close={() => setOpen(false)}
        key={1}
        size={"xl"}
        children={<GameHistoryModal history={history.history} />}
      />
      <Flex justifyContent={"space-between"}>
        <Flex fontWeight={"bold"} direction={"column"}>
          <Text fontSize={"3xl"} color={theme.primaryTextColor}>
            Game History
          </Text>
        </Flex>
        <Button
          display={history.history.length > 4 ? "block" : "none"}
          bg={theme.ternaryButtonColor}
          color={theme.secondaryTwoTextColor}
          size="sm"
          onClick={() => setOpen(true)}
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
            {tempHistory.history.map((d, i) => (
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
          <TableCaption>
            {tempHistory.history.length === 0 ? (
              <Flex
                width={"100%"}
                justifyContent={"center"}
                alignItems="center"
              >
                <Text textAlign={"center"}>No History</Text>
              </Flex>
            ) : null}
          </TableCaption>
        </Table>
      </TableContainer>
    </Flex>
  );
};
export default GameHistory;
