import { Box, Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

import GameBarTile from "./GameBarTile";

const GameNavbar = () => {
  return (
    <Flex justifyContent={"space-between"}>
      <Box
        bgColor={theme.bgColor}
        color={theme.highLightColor}
        fontWeight="bold"
        p={{ base: "4" }}
        borderTopRadius={"2xl"}
        borderTopLeftRadius={{ base: "2xl" }}
        textAlign="center"
        pr={{ base: "8", xl: "16" }}
        pl={{ base: "6" }}
      >
        <Box
          fontSize={{ base: "xl" }}
          display={"flex"}
          justifyContent="flex-start"
          columnGap={".5rem"}
        >
          <Text>Axle</Text>
          <Text color={theme.primaryColor}>Web3 Games</Text>
        </Box>
      </Box>
      <Box
        borderRadius={"2xl"}
        bg={theme.bgColor}
        display={"flex"}
        columnGap=".25rem"
        mb={2}
      >
        <GameBarTile isActive={true} title={"Single Player"} />
        <GameBarTile isActive={false} title={"Multi Player"} />
        <GameBarTile isActive={false} title={"Tournaments"} />
      </Box>
    </Flex>
  );
};

export default GameNavbar;
