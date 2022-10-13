import { Flex, Grid, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import LiveGameCard from "../components/LiveGameCard";
import Logo from "../../../assets/home/logos/icon.png";

const LiveGames = () => {
  const liveGames = [
    {
      name: "Wordle #5",
      img: Logo,
      title: "Enter with 50 GAMEIN tokens, Win 80% of total game fund.",
    },
    {
      name: "Wordle #6",
      img: Logo,
      title: "Enter with 50 GAMEIN tokens, Win 80% of total game fund.",
    },
    {
      name: "Wordle #7",
      img: Logo,
      title: "Enter with 50 GAMEIN tokens, Win 80% of total game fund.",
    },
    {
      name: "Lewdle",
      img: Logo,
      title: "Enter with 50 GAMEIN tokens, Win 80% of total game fund.",
    },
    {
      name: "Lookdle",
      img: Logo,
      title: "Enter with 50 GAMEIN tokens, Win 80% of total game fund.",
    },
    {
      name: "Framed",
      img: Logo,
      title: "Enter with 50 GAMEIN tokens, Win 80% of total game fund.",
    },
  ];

  return (
    <Flex columnGap={"2rem"} p={4} bg={theme.bgColor} borderRadius="xl">
      <Flex rowGap={".5rem"} direction={"column"}>
        <Text
          fontSize={"xl"}
          fontWeight={"bold"}
          color={theme.primaryTextColor}
        >
          Live Web3 Games
        </Text>
        <Grid
          justifyContent={"center"}
          alignItems="center"
          templateColumns={{ base: "1fr", md: "1fr 1fr", xl: "1fr 1fr 1fr" }}
          columnGap={"1rem"}
          rowGap={"1rem"}
        >
          {liveGames.map((game, index) => (
            <LiveGameCard
              img={game.img}
              key={index}
              name={game.name}
              title={game.title}
            />
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};
export default LiveGames;
