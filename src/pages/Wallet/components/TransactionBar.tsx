import { Box, Flex, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

import GameBarTile from "./TransactionBarTile";

const TransactionsBar = (props: any) => {
  return (
    <Flex justifyContent={"flex-end"}>
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
          title={"Transactions"}
        />
        <GameBarTile
          onClick={() => props.onClick(1)}
          isActive={props.page === 1 ? true : false}
          title={"Rewards"}
        />
      </Box>
    </Flex>
  );
};

export default TransactionsBar;
