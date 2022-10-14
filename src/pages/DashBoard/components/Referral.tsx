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

const Referral = () => (
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
          Your Invites
        </Text>
        <Text color={theme.secondaryTextColor}>See who is top on the list</Text>
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
            <Th>Username</Th>
            <Th>Address</Th>
            <Th>Reward</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr boxShadow={`0px 2px 1px ${theme.secondaryTextColor}`}>
            <Td>roberm2</Td>
            <Td>0x1S211202242r921...</Td>
            <Td>200 Axle</Td>
          </Tr>
          <Tr boxShadow={`0px 2px 1px ${theme.secondaryTextColor}`}>
            <Td>jhoncf4</Td>
            <Td>0x0921222242r92d8...</Td>
            <Td>200 Axle</Td>
          </Tr>
          <Tr boxShadow={`0px 2px 1px ${theme.secondaryTextColor}`}>
            <Td>altowolt8</Td>
            <Td>0x21102242r92d444...</Td>
            <Td>200 Axle</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  </Flex>
);
export default Referral;