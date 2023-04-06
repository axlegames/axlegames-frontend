import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

interface Props {
  click: Function;
  get7Day: Function;
  challengeType: string;
  pool: number;
  axleContests: number;
  challengers: number;
  createdAt: string;
  i: number;
}

interface TagProps {
  name: string;
  value: string;
}

const Tag = (props: TagProps) => {
  return (
    <Flex
      fontFamily={"'Russo One', sans-serif"}
      columnGap={"1rem"}
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>{props.name}</Box>
      <Box
        p={2}
        minW="100px"
        borderRadius={"md"}
        bg={theme.bgColor}
        color={theme.primaryTextColor}
        textAlign="right"
        fontWeight={"bold"}
        boxShadow="lg"
      >
        {props.value}
      </Box>
    </Flex>
  );
};

const ChallengeCard = (props: Props) => {
  return (
    <Box
      cursor={"pointer"}
      p={2}
      backgroundImage={`linear-gradient(to right top, #0e063d, #160d5d, #220f7e, #330fa0, #4609c3)`}
      borderRadius="md"
      color={theme.secondaryTextColor}
      rowGap=".25rem"
      display={"flex"}
      flexDirection="column"
      fontSize={"sm"}
      minW="320px"
    >
      <Text fontFamily={"'Russo One', sans-serif"}>
        Challenge #{props.i + 1}
      </Text>
      <Divider
        py={1}
        my={2}
        backgroundImage={`linear-gradient(to top, #eb6612, #ee2e4c, #d4007c, #9828a3, #1442b5)`}
        borderRadius={"xl"}
      />
      <Tag name={"Name"} value={props.challengeType} />
      <Tag name={"Prize Pool"} value={props.pool.toString()} />
      <Tag name={"Contests"} value={props.axleContests.toString()} />
      <Tag name={"Players"} value={props.challengers.toString()} />
      <Tag name={"Expires In"} value={props.get7Day(props.createdAt)} />

      <Divider
        py={1}
        my={2}
        backgroundImage={`linear-gradient(to top, #eb6612, #ee2e4c, #d4007c, #9828a3, #1442b5)`}
        borderRadius={"xl"}
      />
      <Flex>
        <Button
          border="none"
          outline={"none"}
          bg={theme.bgColor}
          fontFamily={"'Russo One', sans-serif"}
          boxShadow="dark-lg"
          color={theme.primaryTextColor}
          variant={"outline"}
          onClick={() => props.click()}
          width="100%"
          _hover={{
            bg: theme.fgColor,
          }}
        >
          Enter
        </Button>
      </Flex>
    </Box>
  );
};

export default ChallengeCard;
