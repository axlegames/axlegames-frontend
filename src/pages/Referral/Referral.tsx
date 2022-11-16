import {
  Box,
  Button,
  Flex,
  Grid,
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
import { TokenAuthStatus } from "../../config/auth";
import { theme } from "../../config/theme.config";
import NeuButton from "../Axle/component/NeuButton";
import { ReferralServices, ReferralModel } from "./ReferralServices";

const Referral = () => {
  const navigate = useNavigate();
  const isAuthorized = (status: TokenAuthStatus) => {
    if (
      status.valueOf().toString() ===
      TokenAuthStatus.UNAUTHORIZED.valueOf().toString()
    ) {
      localStorage.clear();
      return navigate("/");
    }
  };

  useEffect(() => {
    ReferralServices.getReferralAndReferralCode()
      .then((res) => {
        isAuthorized(res as TokenAuthStatus);
        setReferral(res as ReferralModel);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [referral, setReferral] = useState<ReferralModel>({
    referralCode: "testRef",
    referrals: ["jayright", "johndoe"],
  });

  const link = `https://axlegames.io/signup/${referral.referralCode}`;

  return (
    <Grid
      templateColumns={{ base: "1fr", xl: "2fr 1.2fr" }}
      columnGap="3rem"
      justifyContent={"space-between"}
      rowGap={"1rem"}
      p={4}
      shadow="xl"
      borderRadius={"xl"}
      aria-expanded="false"
      display={{ base: "grid" }}
      bg={theme.bgColor}
    >
      <Flex bg={theme.bgColor} direction="column" justifyContent={"flex-start"}>
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
            display={referral.referrals.length > 4 ? "block" : "none"}
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
                  Usernames
                </Th>
                {/* <Th
                  fontSize={"md"}
                  color={theme.secondaryTwoTextColor}
                  fontFamily="quicksand"
                  fontWeight="bold"
                >
                  Address
                </Th> */}
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
              {referral.referrals.map((d, i) => (
                <Tr
                  borderBottom={`2px solid ${theme.primaryTwoTextColor}`}
                  borderLeft="none"
                  borderRight={"none"}
                  borderTop="none"
                  key={i}
                >
                  <Td>{d}</Td>
                  {/* <Td>{d}...</Td> */}
                  <Td>{100} AXLE</Td>
                </Tr>
              ))}
            </Tbody>
            <TableCaption>
              {referral.referrals.length === 0 ? (
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

      <Flex direction={"column"} fontWeight="bold" rowGap={".5rem"}>
        <Box>
          <Text fontSize={"3xl"} color={theme.primaryTextColor}>
            Referral Link
          </Text>

          {/* <Text color={theme.secondaryTextColor} fontSize="sm">
            See who is on your top list.
          </Text> */}
        </Box>

        <Box borderRadius={"lg"} p={4} bg={theme.fgColor}>
          <Text color={theme.secondaryTextColor}>
            100 AXLE Tokens per friend
          </Text>
          <Box width="100%" my={2} bg={theme.bgColor} p={2} borderRadius="lg">
            <Text color={theme.primaryTwoTextColor}>{link}</Text>
          </Box>
          <NeuButton
            bg={"#A34400"}
            shadow={"#FF7C1F"}
            onClick={() => {}}
            label="copy"
          />
        </Box>
      </Flex>
    </Grid>
  );
};
export default Referral;
