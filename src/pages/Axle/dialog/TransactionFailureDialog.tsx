import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import Failed from "../../../assets/gamein/cancel.png";
import { theme } from "../../../config/theme.config";

const TransactionFailureDialog = (props: any) => {
  return (
    <Box>
      <Box display={"flex"} py={8} flexDirection="column" rowGap={"1rem"}>
        <Flex
          direction={"column"}
          justifyContent="center"
          rowGap={"1rem"}
          alignItems={"center"}
        >
          <Image width={"50%"} src={Failed} />
          <Text fontSize={"xl"}>Oops, something went wrong, try again</Text>
        </Flex>
        <Flex justifyContent={"center"}>
          <Button
            width={"50%"}
            size={"lg"}
            _hover={{ color: theme.bgColor }}
            bg={theme.ternaryButtonColor}
            onClick={props.close}
          >
            Close
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default TransactionFailureDialog;
