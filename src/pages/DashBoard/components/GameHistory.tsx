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

const GameHistory = () => (
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
          Game History
        </Text>
      </Flex>
      <Button
        bg={theme.secondaryButtonColor}
        color={theme.secondaryTwoTextColor}
        size="sm"
      >
        View all
      </Button>
    </Flex>
    <TableContainer aria-expanded="false" my={4}>
      <Table color={theme.secondaryTextColor} variant="unstyled" size="md">
        <Thead>
          <Tr>
            <Th>Game</Th>
            <Th>Fee</Th>
            <Th>Reward</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr boxShadow={`0px 2px 1px ${theme.secondaryTextColor}`}>
            <Td>Wordle #5</Td>
            <Td>100 $Axle</Td>
            <Td>200 $Axle</Td>
          </Tr>

          <Tr boxShadow={`0px 2px 1px ${theme.secondaryTextColor}`}>
            <Td>Wordle #7</Td>
            <Td>100 $Axle</Td>
            <Td>200 $Axle</Td>
          </Tr>

          <Tr boxShadow={`0px 2px 1px ${theme.secondaryTextColor}`}>
            <Td>Wordle #6</Td>
            <Td>100 $Axle</Td>
            <Td>200 $Axle</Td>
          </Tr>
          <Tr boxShadow={`0px 2px 1px ${theme.secondaryTextColor}`}>
            <Td>Wordle #7</Td>
            <Td>100 $Axle</Td>
            <Td>200 $Axle</Td>
          </Tr>

          <Tr boxShadow={`0px 2px 1px ${theme.secondaryTextColor}`}>
            <Td>Wordle #6</Td>
            <Td>100 $Axle</Td>
            <Td>200 $Axle</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  </Flex>
);
export default GameHistory;
