import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import Logo from "../../assets/home/logos/logo.png";
import Icon from "../../assets/home/logos/icon.png";
import { theme } from "../../config/theme.config";

const data = [
  {
    title: "Pay for Games",
    content: "Win NFT's and Crypto rewards on multiple events.",
  },
  {
    title: "Pay for NFT's",
    content: "Win NFT's and Crypto rewards on multiple events.",
  },
  {
    title: "Stake GameIn",
    content: "Win NFT's and Crypto rewards on multiple events.",
  },
  {
    title: "Network Payments",
    content: "Win NFT's and Crypto rewards on multiple events.",
  },
  {
    title: "Trade on Exchange",
    content: "Win NFT's and Crypto rewards on multiple events.",
  },
];

const GameInView = (props: any) => {
  const GameCard = (props: any) => {
    return (
      <Box
        bg={theme.bgColor}
        p={4}
        borderRadius="2xl"
        color={theme.primaryColor}
        display="flex"
        alignItems={"center"}
        flexDirection={"column"}
        textAlign="left"
      >
        <Image
          display={"flex"}
          alignSelf="flex-start"
          height={"12"}
          width="12"
          src={Icon}
        ></Image>
        <Text
          display={"flex"}
          alignSelf="flex-start"
          textAlign={"left"}
          fontSize={"sm"}
        >
          {props.title}
        </Text>
        <Text color={theme.secondaryColor} fontSize={"smaller"}>
          {props.content}
        </Text>
      </Box>
    );
  };

  return (
    <Box
      bg={theme.fgColor}
      p={8}
      borderRadius="2xl"
      my={5}
      fontFamily={"quicksand"}
      fontWeight="bold"
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      flexDirection="column"
      rowGap="2rem"
    >
      <Box
        color={theme.primaryColor}
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        textAlign={"center"}
      >
        <Text fontSize={"3xl"}>The Gaming Network Currency</Text>
        <Text fontSize={"xl"}>Introducing GAMEIN Token</Text>
      </Box>
      <Box
        width={"100%"}
        display={"flex"}
        alignItems="center"
        justifyContent={"space-evenly"}
        columnGap="4rem"
        padding={"8"}
      >
        <Box
          width={"60%"}
          display={"flex"}
          flexDirection="column"
          rowGap={"1rem"}
        >
          <Box>
            <Text color={theme.primaryColor}>
              Start You Web3 gaming and in-Game NFT journey with GAMEIN Token by
              GameInfinity
            </Text>
          </Box>
          <Flex columnGap={"1rem"}>
            <Button>Join Presale</Button>
            <Button>Contract</Button>
          </Flex>
        </Box>
        <Box width={"40%"}>
          <Image src={Logo} />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent="space-evenly" columnGap={".5rem"}>
        {data.map((c, i) => (
          <GameCard key={i} title={c.title} content={c.content}></GameCard>
        ))}
      </Box>
      <Box p={5}>
        <Flex columnGap={"2rem"} justifyContent={"space-evenly"}>
          <Image src={Logo}></Image>
          <Box
            color={theme.secondaryColor}
            display="flex"
            flexDirection={"column"}
            rowGap="1rem"
          >
            <Text fontSize={"2xl"}>Finest designed gaming and NFT Project</Text>
            <Text>
              GameInfinity project, tokenomics, roadmap and whitepaper is
              designed to serve the best crypto project to all the participants.
            </Text>
            <Text>
              Investors, gamers, promoters and developers all get to earn and
              enjoy in real time. GameInfinity project, takenomics, roadmap and
              whitepaper is designed to serve the best crypto project to all the
              participants.
            </Text>
            <Text>
              Investors, gamers, promoters and developers all get to earn and
              enjoy in real time. GameInfinity project, takenomics, roadmap and
              whitepaper is designed to serve the best crypto project to all the
              participants.
            </Text>
            <Button width="48">Whitepaper</Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default GameInView;
