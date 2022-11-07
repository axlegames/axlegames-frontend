import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { theme } from "../../../config/theme.config";
import Dialog from "../dialog/Dialog";
import PreSale from "../dialog/PreSale";
import NeuButton from "./NeuButton";
import Tag from "./Tag";

const AxleInfo = () => {
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

  const [open, setOpen] = useState(false);

  return (
    <Grid
      templateColumns={{ base: "1fr", xl: "1fr 1fr" }}
      alignItems={"center"}
      p={8}
      borderRadius="xl"
    >
      <Dialog
        close={() => setOpen(false)}
        children={<PreSale />}
        isOpen={open}
        key={1}
        size={"lg"}
      />
      <Box justifyContent={"center"} alignSelf="center" display={"flex"}>
        <Image
          onClick={() => setOpen(true)}
          src={"https://axlegames.s3.ap-south-1.amazonaws.com/axle_poster.png"}
          borderRadius="xl"
          cursor={"pointer"}
        />
      </Box>

      <Flex
        my={{ base: "8" }}
        px={{ base: "8" }}
        direction={"row"}
        textAlign={"left"}
        fontWeight="bold"
      >
        <Flex
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
          <Text
            color={theme.primaryTextColor}
            fontSize={{ base: "2xl", xl: "3xl" }}
            textAlign="center"
          >
            Token Information
          </Text>
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
              <NeuButton onClick={() => setOpen(true)} label="Buy now" />
              <a
                href="https://testnet.bscscan.com/address/0x9FE1eb84F87d83Ad87A532aD3ce034037039913B"
                target="_blank"
                rel="noopener noreferrer"
              >
                <NeuButton label="Contract" />
              </a>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Grid>
  );
};

export default AxleInfo;
