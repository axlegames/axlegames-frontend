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

const GameHistoryModal = (props: any) => {
  return (
    <Box>
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
            {props.history.map((d: any, i: number) => (
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
                <Td>{d.fee} AX</Td>
                <Td>{d.reward} AX</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GameHistoryModal;
