import {
  Box,
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
import { Fee } from "../WalletServices";

interface Props {
  transactions: Fee[];
}
const WalletTranscations = (props: Props) => {
  const transactions = props.transactions || [];
  return (
    <Box fontFamily={"quicksand"} fontWeight="bold">
      <Box p={3}>
        <Text fontSize={"3xl"} color={theme.primaryTextColor}>
          Wallet Transaction History (3)
        </Text>
        <Text color={theme.secondaryTextColor}>
          Track your GAMEIN token transactions in GameInfinity account.
        </Text>
      </Box>
      <TableContainer
        p={3}
        borderRadius={"xl"}
        bg={theme.bgColor}
        aria-expanded="false"
        my={4}
      >
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
                Transaction Type
              </Th>
              <Th
                fontFamily="quicksand"
                color={theme.secondaryTwoTextColor}
                fontSize={"md"}
              >
                Amount
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((d: Fee, i: number) => (
              <Tr
                key={i}
                borderBottom={`2px solid ${theme.primaryTwoTextColor}`}
                borderLeft="none"
                borderRight={"none"}
                borderTop="none"
                position={"relative"}
              >
                <Td>
                  <Text zIndex={2}>{d.game}</Text>
                </Td>
                <Td>{d.transactionType} </Td>
                <Td>{d.fee} AXLE</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default WalletTranscations;
