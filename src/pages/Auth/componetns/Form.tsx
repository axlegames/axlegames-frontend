import { Box, Flex, Text } from "@chakra-ui/react";
import { AiOutlineCopyright } from "react-icons/ai";
import { theme } from "../../../config/theme.config";

const Form = (props: any) => {
  return (
    <Box
      minH={"80vh"}
      borderRadius={"2xl"}
      bg={theme.fgColor}
      fontFamily={"quicksand"}
      fontWeight="bold"
      color={theme.highLightColor}
      p={{ base: "8" }}
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      rowGap={{ base: ".6rem" }}
    >
      {props.children}
      <Flex justifyContent={"center"} alignItems="center" columnGap={".4rem"}>
        <AiOutlineCopyright />
        <Text color={theme.highLightColor} variant={"link"}>
          AxleGames
        </Text>
      </Flex>
    </Box>
  );
};

export default Form;
