import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const StatsCard = (props: any) => {
  return (
    <Flex
      _hover={{
        transform: "scale(1.05)",
        transition: "200ms all ease-in",
      }}
      p={{ base: "2" }}
      direction={"column"}
    >
      <Box
        display={"flex"}
        flexDirection={{ base: "column" }}
        justifyContent={{ base: "center" }}
        bg={theme.bgColor}
        p={{ base: "4" }}
        borderRadius={{ base: "2xl" }}
        textAlign={{ base: "center" }}
      >
        <Image
          borderRadius={{ base: "48vh" }}
          w={{ base: "48" }}
          mb={{ base: "4" }}
          src={props.img}
        ></Image>
        <Text fontSize={{ base: "smaller" }}>{props.game}</Text>
        <Flex
          flexDirection={{ base: "column" }}
          justifyContent={{ base: "center" }}
        >
          <Text fontSize={{ base: "small" }}>{props.category}</Text>
          <Text color={theme.primaryColor}>{props.value}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default StatsCard;
