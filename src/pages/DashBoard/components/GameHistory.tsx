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
import { theme } from "../../../config/theme.config";

const GameHistory = () => {
  const data = [
    {
      game: "Wordle #5",
      fee: "200",
      reward: "300",
    },
    {
      game: "Wordle #6",
      fee: "100",
      reward: "200",
    },
    {
      game: "Wordle #5",
      fee: "100",
      reward: "200",
    },
    {
      game: "Wordle #5",
      fee: "200",
      reward: "300",
    },
    {
      game: "Wordle #6",
      fee: "100",
      reward: "200",
    },
  ];

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
          <Thead boxShadow={`0px 0px 350px 30px ${theme.primaryTwoTextColor}`}>
            <Tr>
              <Th color={theme.secondaryTwoTextColor}>Game</Th>
              <Th
                color={theme.secondaryTwoTextColor}
                fontWeight="bold"
                visibility={{ base: "hidden", md: "visible" }}
              >
                Fee
              </Th>
              <Th
                color={theme.secondaryTwoTextColor}
                fontWeight="bold"
                visibility={{ base: "hidden", md: "visible" }}
              >
                Reward
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((d, i) => (
              <Tr key={i}>
                <Td> {d.game}</Td>
                <Td visibility={{ base: "hidden", md: "visible" }}>
                  {d.fee} AXLE
                </Td>
                <Td visibility={{ base: "hidden", md: "visible" }}>
                  {d.reward} AXLE
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};
export default GameHistory;
