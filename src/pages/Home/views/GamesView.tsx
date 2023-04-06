import { theme } from "../../../config/theme.config";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import GameNavbar from "../components/gameview/GameNavbar";
import GamesGrid from "../components/gameview/GamesGrid";
import GameBanner from "../components/gameview/GameBanner";
import GameEntryModal from "../modals/GameEntryModal";

import { AxleGame, AxleGames, HomeServices } from "../HomeServices";

const GamesView = () => {
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

  const [page, setPage] = useState(0);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (page === 1 || page === 2) {
      let games = axleGames.axleGames;
      games[0].isActive = false;
      games[1].isActive = false;
      games[2].isActive = false;
      setAxleGames({ axleGames: games });
    } else {
      HomeServices.getAxleGames()
        .then((axleGames) => {
          setAxleGames(axleGames);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Box fontFamily={"quicksand"} marginBottom={{ lg: "2rem" }}>
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

      <GameBanner />
      <Flex
        bgColor={theme.fgColor}
        display={"flex"}
        p={{ base: "4" }}
        flexDirection="column"
        borderRadius={"2xl"}
        color={theme.primaryTextColor}
      >
        <GameNavbar
          onTabChange={(t: number) => setTab(t)}
          onPageChange={(p: number) => setPage(p)}
          page={page}
          tab={tab}
        />
        <GamesGrid openModal={openModal} axleGames={axleGames.axleGames} />
      </Flex>
    </Box>
  );
};

export default GamesView;
