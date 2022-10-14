import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const LiveGameCard = (props: any) => {
  return (
    <Box
      bg={theme.fgColor}
      borderRadius="xl"
      p={4}
      flexDirection={"column"}
      display="flex"
      rowGap={".5rem"}
    >
      <Flex columnGap={"1rem"} fontWeight="bold" alignItems={"center"}>
        <Image width={"12"} src={props.img} />
        <Text color={theme.primaryTextColor}>{props.name}</Text>
      </Flex>
      <Text fontWeight={"bold"} color={theme.secondaryTextColor}>
        {props.title}
      </Text>
      <Flex columnGap={".5rem"}>
        <Button color={theme.bgColor} bg={theme.primaryButtonColor} size="sm">
          Play now
        </Button>
        <Button
          color={theme.secondaryTwoTextColor}
          bg={theme.secondaryButtonColor}
          size="sm"
        >
          Game History
        </Button>
      </Flex>
    </Box>
  );
};

export default LiveGameCard;
