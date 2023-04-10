import { Box, Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

import GameBarTile from "./GameBarTile";

const GameNavbar = (props: any) => {
  return (
    <Flex justifyContent={"space-between"}>
      <Flex mx={3}>
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
          px={4}
          borderTopRadius="xl"
          fontWeight={"bold"}
          columnGap=".5rem"
          transition={"all 200ms ease-in"}
          bg={theme.bgColor}
          onClick={() => props.onTabChange(0)}
          cursor="pointer"
          py={2}
        >
          <Text color={theme.secondaryTextColor}>Axle</Text>
          <Text color={theme.primaryTextColor}>AI Games</Text>
        </Box>
        {/* <Box
          cursor="pointer"
          bg={props.tab === 1 ? theme.primaryButtonColor : theme.bgColor}
          onClick={() => props.onTabChange(1)}
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
          px={4}
          py={2}
          borderRightRadius="xl"
          fontWeight={"bold"}
          columnGap=".5rem"
          transition={"all 200ms ease-in"}
        >
          <Text color={theme.secondaryTextColor}>Axle</Text>
          <Text
            color={props.tab === 1 ? theme.bgColor : theme.primaryButtonColor}
          >
            Web3 Games
          </Text>
        </Box> */}
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
