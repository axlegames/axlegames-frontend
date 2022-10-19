import { Flex, Text } from "@chakra-ui/react";
import { BiInfoCircle } from "react-icons/bi";
import { theme } from "../../../config/theme.config";

const HighLightCard = (props: any) => {
  return (
    <Flex
      shadow="lg"
      padding={2}
      bg={theme.bgColor}
      borderRadius={"xl"}
      direction={"column"}
      justifyContent="center"
      alignItems="center"
      rowGap={".15rem"}
      fontWeight="bold"
    >
      <props.icon size={46} color={theme.secondaryMiscColor} />
      <Flex alignItems={"center"} columnGap=".25rem" justifyContent={"center"}>
        <Text color={theme.primaryTwoTextColor} fontSize={{ xl: "xl" }}>
          {props.mainText}
        </Text>
        <BiInfoCircle
          color={theme.secondaryTextColor}
          style={{ cursor: "pointer" }}
        />
      </Flex>
      <Text color={theme.secondaryTextColor} fontSize={{ xl: "xl" }}>
        {props.subText}
      </Text>
    </Flex>
  );
};

export default HighLightCard;
