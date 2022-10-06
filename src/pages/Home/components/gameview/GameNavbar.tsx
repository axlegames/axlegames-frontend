import { Box, Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

import GameBarTile from "./GameBarTile";

const GameNavbar = (props: any) => {
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
        <GameBarTile
          onClick={() => props.onClick(0)}
          isActive={props.page === 0 ? true : false}
          title={"Single Player"}
        />
        <GameBarTile
          onClick={() => props.onClick(1)}
          isActive={props.page === 1 ? true : false}
          title={"Multi Player"}
        />
        <GameBarTile
          onClick={() => props.onClick(2)}
          isActive={props.page === 2 ? true : false}
          title={"Tournaments"}
        />
      </Box>
    </Flex>
  );
};

export default GameNavbar;
