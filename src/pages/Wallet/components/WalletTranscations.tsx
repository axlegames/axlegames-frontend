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
import moment from "moment";

interface Props {
  transactions: Fee[];
}
const WalletTranscations = (props: Props) => {
  const transactions = props.transactions || [];
  const headers = ["Date", "Transcation Type", "Amount", "Type", "Balance"];
  return (
    <Box fontFamily={"quicksand"} fontWeight="bold">
      <Box p={3}>
        <Text fontSize={"3xl"} color={theme.primaryTextColor}>
          Wallet Transaction History ({transactions.length})
        </Text>
        {/* <Text color={theme.secondaryTextColor}>
          Track your AXLE token transactions in AXLE account.
        </Text> */}
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
              {headers.map((h, i) => (
                <Th
                  key={i}
                  fontFamily="quicksand"
                  color={theme.secondaryTwoTextColor}
                  fontSize={"md"}
                >
                  {h}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((d: Fee, i: number) => {
              const type = d.fee !== 0 ? "DEBIT" : "CREDIT";
              const feeType = d.fee !== 0 ? d.fee : d.reward;
              const sign = d.fee !== 0 ? "-" : "+";

              return (
                <Tr
                  key={i}
                  borderBottom={`2px solid ${theme.primaryTwoTextColor}`}
                  borderLeft="none"
                  borderRight={"none"}
                  borderTop="none"
                  position={"relative"}
                >
                  <Td>
                    <Box>
                      <Text>{moment(d.createdAt).format("LLL")}</Text>
                    </Box>
                  </Td>
                  <Td>{d.transactionType} </Td>
                  <Td>{`${sign}` + feeType} AXLE</Td>
                  <Td>{type}</Td>
                  <Td>{d.currentBalance}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default WalletTranscations;
