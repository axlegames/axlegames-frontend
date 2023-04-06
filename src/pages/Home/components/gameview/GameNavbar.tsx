import { Box, Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

import GameBarTile from "./GameBarTile";

const GameNavbar = (props: any) => {
  return (
    <Flex justifyContent={"space-between"}>
      <Flex my={1}>
        <Box
          transition={"all 200ms ease-in"}
          fontWeight="bold"
          p={{ base: "4" }}
          borderLeftRadius="2xl"
          textAlign="center"
          pr={{ base: "8", xl: "16" }}
          pl={{ base: "6" }}
          fontSize={{ base: "xl" }}
          display={"flex"}
          justifyContent="flex-start"
          columnGap={".5rem"}
          cursor="pointer"
          bg={props.tab === 0 ? theme.primaryButtonColor : theme.bgColor}
          onClick={() => props.onTabChange(0)}
        >
          <Text color={theme.secondaryTextColor}>Axle</Text>
          <Text
            color={props.tab === 0 ? theme.bgColor : theme.primaryButtonColor}
          >
            AI Games
          </Text>
        </Box>
        <Box
          cursor="pointer"
          transition={"all 200ms ease-in"}
          bg={props.tab === 1 ? theme.primaryButtonColor : theme.bgColor}
          onClick={() => props.onTabChange(1)}
          fontWeight="bold"
          p={{ base: "4" }}
          textAlign="center"
          borderRightRadius={"2xl"}
          pr={{ base: "8", xl: "16" }}
          pl={{ base: "6" }}
          fontSize={{ base: "xl" }}
          display={"flex"}
          justifyContent="flex-start"
          columnGap={".5rem"}
        >
          <Text color={theme.secondaryTextColor}>Axle</Text>
          <Text
            color={props.tab === 1 ? theme.bgColor : theme.primaryButtonColor}
          >
            Web3 Games
          </Text>
        </Box>
      </Flex>
      <Box
        borderRadius={"2xl"}
        bg={theme.bgColor}
        display={"flex"}
        columnGap=".25rem"
        mb={2}
      >
        <GameBarTile
          onClick={() => props.onPageChange(0)}
          isActive={props.page === 0 ? true : false}
          title={"Single Player"}
        />

        <GameBarTile
          onClick={() => props.onPageChange(1)}
          isActive={props.page === 1 ? true : false}
          title={"Tournaments"}
        />
      </Box>
    </Flex>
  );
};

export default GameNavbar;
