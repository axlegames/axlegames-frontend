import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { theme } from "../../../config/theme.config";
import Dialog from "../dialog/Dialog";
import PreSale from "../dialog/PreSale";
import Tag from "./Tag";

const Section = () => {
  const [open, setOpen] = useState(false);
  const token = [
    {
      name: "name",
      value: "Axle",
    },
    {
      name: "ticker",
      value: "$AXLE",
    },
    {
      name: "total supply",
      value: "500 million",
    },
    {
      name: "type",
      value: "BEP-20",
    },
    {
      name: "sale",
      value: "200 million",
    },
    {
      name: "circulation supply",
      value: "63.5 million",
    },
  ];

  return (
    <Flex
      justifyContent={"space-evenly"}
      alignItems={"center"}
      direction={{ base: "column", lg: "row" }}
    >
      <Dialog
        close={() => setOpen(false)}
        children={<PreSale />}
        isOpen={open}
        key={1}
        size={"lg"}
      />
      <Flex
        alignItems={"center"}
        my={{ base: "8" }}
        px={{ base: "8" }}
        color={theme.primaryTextColor}
        direction={"column"}
        textAlign={"left"}
        fontWeight="bold"
        rowGap={{ base: "4" }}
        minW={{ lg: "30vw" }}
        maxW={{ lg: "30vw" }}
      >
        <Text>
          Start You Web3 gaming and in-Game NFT journey with GAMEIN Token by
          GameInfinity Start You Web3 gaming and in-Game NFT journey with GAMEIN
          Token by GameInfinity Start You Web3 gaming and in-Game NFT journey
          with GAMEIN Token by GameInfinity Start You Web3 gaming and in-Game
          NFT journey with GAMEIN Token by GameInfinity with GAMEIN Token by
          GameInfinity Start
        </Text>
        <Text>
          Start You Web3 gaming and in-Game NFT journey with GAMEIN Token by
          GameInfinity
        </Text>
        <Flex
          width="100%"
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
        >
          <Button onClick={() => setOpen(true)} size="lg">
            Join Presale
          </Button>
        </Flex>
      </Flex>
      <Flex
        color={theme.primaryTextColor}
        direction="column"
        bg={theme.fgColor}
        borderRadius="2xl"
        p={{ base: "6" }}
        fontWeight="bold"
        m={{ base: "4" }}
        minW={{ base: "32vw", lg: "25vw" }}
      >
        <Text fontSize={{ base: "2xl", xl: "3xl" }}>Token Information</Text>
        <Divider />
        <Flex my={4} rowGap={".5rem"} direction={"column"}>
          {token.map((t, i) => (
            <Tag name={t.name} value={t.value} />
          ))}
        </Flex>
        <Divider />
        <Text fontSize={{ base: "2xl", xl: "3xl" }}>Contact Address</Text>
        <Text
          fontWeight={"normal"}
          fontSize={{ base: "sm", xl: "md" }}
        >{`< To be updated soon >`}</Text>
      </Flex>
    </Flex>
  );
};

export default Section;
