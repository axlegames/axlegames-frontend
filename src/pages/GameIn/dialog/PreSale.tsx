import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import Logo from "../../../assets/home/logos/logo.png";
import { theme } from "../../../config/theme.config";

const Tag = (props: any) => {
  return (
    <Flex
      color={theme.secondaryTextColor}
      direction={"row"}
      justifyContent="space-between"
      alignItems={"center"}
      columnGap={{ base: "3rem" }}
      fontSize={{ xl: "sm" }}
    >
      <Text>{props.name}</Text>
      <Text>{props.value}</Text>
    </Flex>
  );
};

const PreSale = (props: any) => {
  return (
    <Box px={4} py={8}>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
        rowGap="1rem"
      >
        <Image p={8} src={Logo} />
        <Box textAlign={"center"}>
          <Text>Join the GAMEIN Presale</Text>
          <Text fontWeight={"normal"} fontSize="sm">
            25% of coins on sale. Play,trade & play.
          </Text>
        </Box>
        <Flex direction={"column"}>
          <Tag name="Buy GAMEIN" value="1 GAMEIN = $ 0.0034" />
          <Tag name="1 BNB = 80,000 GAMEIN" value="Listing price : $0.015" />
        </Flex>
        <Text>Connected to: 0x94...2E8A ( Bal : 0.0000 BNB )</Text>
        <Input type={"number"}></Input>
        <Text>Min 0.1 BNB | Max 1.99 BNB</Text>
        <Button color={theme.primaryColor} variant={"outline"} size="sm">
          Buy now
        </Button>
      </Flex>
    </Box>
  );
};

export default PreSale;
