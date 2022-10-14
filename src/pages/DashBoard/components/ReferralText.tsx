import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { BiCopy } from "react-icons/bi";
import { theme } from "../../../config/theme.config";

const ReferralText = (props: any) => {
  return (
    <Box
      justifyContent={"flex-start"}
      shadow="xl"
      height={"100%"}
      borderRadius={"xl"}
      p={4}
      bg={theme.bgColor}
      width="100%"
      aria-expanded="false"
    >
      <Flex
        justifyContent={"flex-start"}
        alignItems="flex-start"
        direction={"column"}
        fontWeight="bold"
        rowGap="1rem"
      >
        <Flex columnGap={".2rem"} alignItems={"center"}>
          <Text color={theme.secondaryTwoTextColor}>Referral Link</Text>
          <BiCopy
            size={28}
            style={{ cursor: "pointer" }}
            color={theme.secondaryTwoTextColor}
          />
        </Flex>

        <Text color={theme.secondaryTextColor} fontSize="sm">
          See who is on your top list.
        </Text>
        <Box borderRadius={"lg"} p={4} bg={theme.fgColor}>
          <Text color={theme.secondaryTextColor}>
            125 $AXLE Tokens per friend
          </Text>
          <Box my={2} bg={theme.bgColor} p={2} borderRadius="lg">
            <Text color={theme.primaryTextColor} fontSize="12px">
              https://axlegames.io/auth/?ref=akashmrc98
            </Text>
          </Box>
          <Button
            bg={theme.secondaryButtonColor}
            color={theme.secondaryTwoTextColor}
          >
            Copy
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default ReferralText;
