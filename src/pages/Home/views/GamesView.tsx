import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { theme } from "../../../config/theme.config";

import GameEntryModal from "../modals/GameEntryModal";
import { AxleGame, AxleGames, HomeServices } from "../HomeServices";
import GameNavbar from "../components/gameview/GameNavbar";
import GamesGrid from "../components/gameview/GamesGrid";
import GameBanner from "../components/gameview/GameBanner";

const GamesView = () => {
  useEffect(() => {
    HomeServices.getAxleGames()
      .then((axleGames) => {
        setAxleGames(axleGames);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [axleGames, setAxleGames] = useState<AxleGames>({ axleGames: [] });
  const [gameModal, setGameModal] = useState(false);
  const [gameConfig, setGameConfig] = useState({
    _id: "",
    name: "",
    description: "",
    isActive: false,
    link: "",
    index: 0,
  });

  function openModal(axleGame: AxleGame, index: number) {
    setGameConfig({
      _id: axleGame._id,
      name: axleGame.name,
      description: axleGame.description,
      link: axleGame.link,
      isActive: axleGame.isActive,
      index: index,
    });
    setGameModal(true);
  }

  return (
    <Box fontFamily={"quicksand"} marginY={{ lg: "2rem" }}>
      <GameEntryModal
        open={gameModal}
        close={() => setGameModal(false)}
        name={gameConfig.name}
        isActive={gameConfig.isActive}
        index={gameConfig.index}
        _id={gameConfig._id}
        description={gameConfig.description}
        link={gameConfig.link}
      />
      <Flex
        bgColor={theme.fgColor}
        display={"flex"}
        p={{ base: "0", md: "8", xl: "16" }}
        flexDirection="column"
        borderRadius={"2xl"}
        color={theme.primaryColor}
      >
        <GameBanner />
        <GameNavbar />
        <GamesGrid openModal={openModal} axleGames={axleGames.axleGames} />
      </Flex>
    </Box>
  );
};

export default GamesView;