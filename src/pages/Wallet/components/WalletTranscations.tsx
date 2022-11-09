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

const WalletTranscations = () => {
  const transactions: any[] = [1, 2, 3, 4, 5];
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
                Date
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
            {transactions.map((d: any, i: number) => (
              <Tr
                key={i}
                borderBottom={`2px solid ${theme.primaryTwoTextColor}`}
                borderLeft="none"
                borderRight={"none"}
                borderTop="none"
                position={"relative"}
              >
                <Td>
                  <Text zIndex={2}>{`${new Date()}`}</Text>
                </Td>
                <Td>{d} Sigin Bonous</Td>
                <Td>{d} AXLE</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default WalletTranscations;
