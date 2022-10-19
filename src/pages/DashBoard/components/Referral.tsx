import {
  Box,
  Button,
  Flex,
  Grid,
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

const Referral = () => {
  const data = [
    {
      username: "roberm2",
      address: "0x1S211202242r921",
      reward: "200",
    },
    {
      username: "jhoncf4",
      address: "0x0921222242r92d8",
      reward: "200",
    },
    {
      username: "altowolt8",
      address: "0x21102242r92d444",
      reward: "200",
    },
  ];
  return (
    <Grid
      templateColumns={{ base: "1fr", xl: "2fr 1.2fr" }}
      columnGap="3rem"
      justifyContent={"space-between"}
      rowGap={"1rem"}
      p={4}
      shadow="xl"
      borderRadius={"xl"}
      bg={theme.bgColor}
      aria-expanded="false"
      display={{ base: "none", md: "grid" }}
    >
      <Flex direction="column" justifyContent={"flex-start"}>
        <Flex justifyContent={"space-between"}>
          <Flex fontWeight={"bold"} direction={"column"}>
            <Text fontSize={"3xl"} color={theme.primaryTextColor}>
              Your Invites
            </Text>
            <Text color={theme.secondaryTextColor}>
              See who is top on the list
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
          <Table color={theme.secondaryTextColor} variant="simple">
            <Thead>
              <Tr
                borderBottom={"none"}
                borderLeft="none"
                borderRight={"none"}
                borderTop="none"
              >
                <Th
                  fontSize={"md"}
                  color={theme.secondaryTwoTextColor}
                  fontFamily="quicksand"
                  fontWeight="bold"
                >
                  Username
                </Th>
                <Th
                  fontSize={"md"}
                  color={theme.secondaryTwoTextColor}
                  fontFamily="quicksand"
                  fontWeight="bold"
                >
                  Address
                </Th>
                <Th
                  fontSize={"md"}
                  color={theme.secondaryTwoTextColor}
                  fontFamily="quicksand"
                  fontWeight="bold"
                >
                  Reward
                </Th>
              </Tr>
            </Thead>
            <Tbody fontWeight={"bold"}>
              {data.map((d, i) => (
                <Tr
                  borderBottom={`3px solid ${theme.primaryTwoTextColor}`}
                  borderLeft="none"
                  borderRight={"none"}
                  borderTop="none"
                  key={i}
                >
                  <Td>{d.username}</Td>
                  <Td>{d.address}...</Td>
                  <Td>{d.reward} AXLE</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>

      <Flex direction={"column"} fontWeight="bold" rowGap={".5rem"}>
        <Box>
          <Text fontSize={"3xl"} color={theme.primaryTextColor}>
            Referral Link
          </Text>

          <Text color={theme.secondaryTextColor} fontSize="sm">
            See who is on your top list.
          </Text>
        </Box>

        <Box borderRadius={"lg"} p={4} bg={theme.fgColor}>
          <Text color={theme.secondaryTextColor}>
            125 AXLE Tokens per friend
          </Text>
          <Box width="100%" my={2} bg={theme.bgColor} p={2} borderRadius="lg">
            <Text color={theme.primaryTwoTextColor}>
              https://axlegames.io/auth/?ref=
              {localStorage.getItem("username") ?? ""}
            </Text>
          </Box>
          <Button
            bg={theme.ternaryButtonColor}
            color={theme.secondaryTwoTextColor}
          >
            Copy
          </Button>
        </Box>
      </Flex>
    </Grid>
  );
};
export default Referral;
