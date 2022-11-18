import { Box, Flex, FormControl, Image, Input, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import NeuButton from "../../Axle/component/NeuButton";

interface Props {
  img: string;
  main: string;
  sub: string;
  action: Function;
  label: string;
  form: boolean;
  amount: string;
  handleAmount: Function;
}

const WalletCard = (props: Props) => {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      bg={theme.bgColor}
      p={4}
      borderRadius="xl"
      alignItems={"center"}
      rowGap={"1rem"}
      minW="14vw"
    >
      <Image width={"20"} height="20" src={props.img} />
      <Box>
        <Text
          textAlign={"center"}
          color={theme.secondaryTextColor}
          fontSize="lg"
        >
          {props.main}
        </Text>
        <Text
          textAlign={"center"}
          color={theme.secondaryTwoTextColor}
          fontSize="xl"
        >
          {props.sub}
        </Text>
      </Box>
      {props.form ? (
        <FormControl color={theme.primaryTextColor} bg={theme.fgColor}>
          <Input
            value={props.amount}
            onChange={(i) => props.handleAmount(i)}
            size={"lg"}
            fontWeight="bold"
            outline={"none"}
            border="none"
            boxShadow={`0px 0px 3px ${theme.primaryButtonColor}`}
            bg={theme.bgColor}
            type={"number"}
          />
        </FormControl>
      ) : null}
      <Flex columnGap={"1rem"}>
        <NeuButton
          onClick={() => props.action()}
          label={props.label}
          bg={"#A34400"}
          shadow={"#FF7C1F"}
        />
      </Flex>
    </Box>
  );
};
export default WalletCard;
