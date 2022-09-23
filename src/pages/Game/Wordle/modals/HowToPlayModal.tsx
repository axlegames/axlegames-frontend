import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import Cell from "../components/Cell";

const HowToPlayModal = (props: any) => {
  return (
    <Box>
      <Flex direction={"column"} rowGap="1rem" py={{ base: "4" }}>
        <Text>Guess the WORDLE in 6 tries.</Text>
        <Text>
          Each guess must be a valid 5-letter word. Hit the enter button to
          submit.
        </Text>
        <Text>
          After each guess, the color of the tiles will change to show how close
          your guess was to the word.
        </Text>
      </Flex>
      <Divider></Divider>
      <Flex
        textAlign={"center"}
        py={{ base: "4" }}
        justifyContent={"center"}
        direction="column"
        rowGap={"1rem"}
      >
        <Text>Examples</Text>
        <Flex justifyContent={"center"}>
          <Cell
            isCurrentRowCompleted={true}
            keyPresence={"correct"}
            letter="W"
          />
          <Cell isCurrentRowCompleted={true} keyPresence={""} letter="E" />
          <Cell isCurrentRowCompleted={true} keyPresence={""} letter="A" />
          <Cell isCurrentRowCompleted={true} keyPresence={""} letter="R" />
          <Cell isCurrentRowCompleted={true} keyPresence={""} letter="Y" />
        </Flex>
        <Text>The letter W is in the word and in the correct spot.</Text>
        <Flex justifyContent={"center"}>
          <Cell isCurrentRowCompleted={true} keyPresence={""} letter="P" />
          <Cell
            isCurrentRowCompleted={true}
            keyPresence={"present"}
            letter="I"
          />
          <Cell isCurrentRowCompleted={true} keyPresence={""} letter="L" />
          <Cell isCurrentRowCompleted={true} keyPresence={""} letter="L" />
          <Cell isCurrentRowCompleted={true} keyPresence={""} letter="S" />
        </Flex>
        <Text>The letter I is in the word but in the wrong spot.</Text>
        <Flex justifyContent={"center"}>
          <Cell isCurrentRowCompleted={true} keyPresence={""} letter="V" />
          <Cell
            isCurrentRowCompleted={true}
            keyPresence={"absent"}
            letter="A"
          />
          <Cell isCurrentRowCompleted={true} keyPresence={""} letter="U" />
          <Cell isCurrentRowCompleted={true} keyPresence={""} letter="G" />
          <Cell isCurrentRowCompleted={true} keyPresence={""} letter="E" />
        </Flex>
        <Text>The letter U is not in the word in any spot.</Text>
      </Flex>
      <Divider />
      <Flex py={{ base: "4" }} direction={"column"} textAlign="center">
        <Text>A new WORDLE will be available each day!</Text>
        <Text>Never miss a Wordle. Sign up for our daily reminder email.</Text>
      </Flex>
    </Box>
  );
};
export default HowToPlayModal;
