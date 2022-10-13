import { Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { theme } from "../../../config/theme.config";
import Dialog from "../dialog/Dialog";
import PreSale from "../dialog/PreSale";
import Tag from "./Tag";
import Timer from "../../../assets/gamein/banner.png";

const AxleInfo = () => {
  const [open, setOpen] = useState(false);
  const token = [
    {
      name: "Name",
      value: "Axle Games",
    },
    {
      name: "Ticker",
      value: "$AXLE",
    },
    {
      name: "Total supply",
      value: "500 million",
    },
    {
      name: "Type",
      value: "BEP-20",
    },
    {
      name: "Sale",
      value: "200 million",
    },
  ];

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      p={8}
      direction={{ base: "column", xl: "row" }}
    >
      <Dialog
        close={() => setOpen(false)}
        children={<PreSale />}
        isOpen={open}
        key={1}
        size={"lg"}
      />
      <Image
        onClick={() => setOpen(true)}
        height={400}
        src={Timer}
        borderRadius="xl"
        cursor={"pointer"}
      />
      <Flex
        my={{ base: "8" }}
        px={{ base: "8" }}
        color={theme.primaryTextColor}
        direction={"row"}
        textAlign={"left"}
        fontWeight="bold"
      >
        <Flex
          color={theme.primaryTextColor}
          direction="column"
          bg={theme.fgColor}
          borderRadius="2xl"
          px={{ base: "6" }}
          pt={{ base: "6" }}
          fontWeight="bold"
          m={{ base: "4" }}
          minW={"30vw"}
          width="100%"
        >
          <Text fontSize={{ base: "2xl", xl: "3xl" }}>Token Information</Text>
          <Divider />
          <Flex my={4} rowGap={".5rem"} direction={"column"}>
            {token.map((t, i) => (
              <Tag name={t.name} value={t.value} />
            ))}
            <Flex
              pt={{ base: "4" }}
              columnGap={"1rem"}
              width="100%"
              justifyContent={"center"}
            >
              <Button
                bg={theme.primaryColor}
                color={"#ffffff"}
                size="sm"
                onClick={() => setOpen(true)}
              >
                Buy now
              </Button>

              <Button size="sm">Contract</Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AxleInfo;
