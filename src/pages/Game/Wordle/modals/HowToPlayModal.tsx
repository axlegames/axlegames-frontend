import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

import Cell from "../components/Cell";
import { getExample } from "./HowToPlayData";

const HowToPlayModal = (props: any) => {
  const example = getExample(props.game);
  return (
    <Box color={theme.highLightColor}>
      <Flex direction={"column"} rowGap="1rem" py={{ base: "4" }}>
        <Text>{example.main}</Text>
        <Text>{example.sub}</Text>
        <Text>{example.text}</Text>
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
        <Flex color={theme.fgColor} justifyContent={"center"}>
          {example[1].map((wordle, index) => (
            <Cell
              key={index}
              isCurrentRowCompleted={wordle.isCompleted}
              keyPresence={wordle.keyPresence}
              letter={wordle.letter}
            />
          ))}
        </Flex>
        <Text>{example.example1}</Text>
        <Flex color={theme.fgColor} justifyContent={"center"}>
          {example[2].map((wordle, index) => (
            <Cell
              key={index}
              isCurrentRowCompleted={wordle.isCompleted}
              keyPresence={wordle.keyPresence}
              letter={wordle.letter}
            />
          ))}
        </Flex>
        <Text>{example.example2}</Text>
        <Flex color={theme.fgColor} justifyContent={"center"}>
          {example[3].map((wordle, index) => (
            <Cell
              key={index}
              isCurrentRowCompleted={wordle.isCompleted}
              keyPresence={wordle.keyPresence}
              letter={wordle.letter}
            />
          ))}
        </Flex>
        <Text>{example.example3}</Text>
      </Flex>
    </Box>
  );
};
export default HowToPlayModal;
