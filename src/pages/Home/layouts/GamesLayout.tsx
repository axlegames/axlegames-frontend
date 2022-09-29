import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Text,
  GridItem,
  Button,
  Image,
} from "@chakra-ui/react";

import { theme } from "../../../config/theme.config";

import GameEntryModal from "../modals/GameEntryModal";
import { AxleGame, AxleGames, HomeServices } from "../HomeServices";

const GamesLayout = () => {
  useEffect(() => {
    HomeServices.getAxleGames()
      .then((axleGames) => {
        setAxleGames(axleGames);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const colors = [
    "#8BBCCC",
    "#31C6D4",
    "#00FFD1",
    "#E1FFB1",
    "#FCFFB2",
    "#C7F2A4",
    "#F8EDE3",
    "#AEBDCA",
    "#FFE3E1",
    "#FFE6F7",
    "#FF9494",
    "#FBF2CF",
    "#C6EBC5",
    "#FFE9A0",
    "#EEF1FF",
    "#ABD9FF",
    "#B7C4CF",
  ];

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
      <Box
        bgColor={theme.fgColor}
        display={"flex"}
        p={{ base: "0", md: "8", xl: "16" }}
        rowGap={"2rem"}
        flexDirection="column"
        borderRadius={"2xl"}
        color={theme.primaryColor}
      >
        <Flex flexDirection={"column"} p={{ base: "2" }}>
          <Text fontSize={"3xl"} fontWeight="bold">
            Welcome to Axle
          </Text>
          <Text color={theme.highLightColor} fontWeight={"bold"}>
            Web3 Games, NFT, Community & Earnings
          </Text>
        </Flex>
        <Box
          display={"flex"}
          columnGap="1rem"
          alignItems="center"
          justifyContent={"start"}
        >
          <Image
            borderRadius={"2xl"}
            height={172}
            src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_1.png"}
          />
          <Image
            borderRadius={"2xl"}
            height={172}
            src={"https://axlegames.s3.ap-south-1.amazonaws.com/banner_2.png"}
          />
        </Box>
        <Flex flexDirection={"column"}>
          <Box
            bgColor={theme.bgColor}
            color={theme.highLightColor}
            fontWeight="bold"
            p={{ base: "4" }}
            borderTopRadius={"2xl"}
            width={{ base: "80%", md: "60%", lg: "30%", xl: "20%" }}
            borderTopLeftRadius={{ base: "2xl" }}
            textAlign="center"
          >
            <Text>Axle Web3 Games</Text>
          </Box>
          <Box
            bgColor={theme.bgColor}
            p={{ base: "4" }}
            borderBottomRadius={"2xl"}
            borderTopRightRadius={{ base: "2xl" }}
          >
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
                "2xl": "repeat(4, 1fr)",
              }}
              gap={6}
            >
              {axleGames.axleGames.map((axleGame, index) => (
                <GridItem
                  position={"relative"}
                  key={index}
                  backgroundSize={"cover"}
                  backgroundRepeat={"no-repeat"}
                  borderRadius={"2xl"}
                >
                  <Image
                    zIndex={0}
                    src={axleGame.image}
                    borderRadius={"2xl"}
                    _hover={{
                      transform: "scale(1.05)",
                      transition: "200ms all ease-in",
                    }}
                  />
                  <Box
                    display={"flex"}
                    justifySelf="center"
                    alignSelf={"center"}
                    position="absolute"
                    zIndex={2}
                    top="0"
                  >
                    <Box
                      p="2"
                      m="2"
                      color={theme.bgColor}
                      bg={colors[index]}
                      borderRadius={"md"}
                      opacity={0.9}
                    >
                      <Text zIndex={2} fontWeight={"bold"} fontSize="smaller">
                        {axleGame.name}
                      </Text>
                    </Box>
                  </Box>

                  {!axleGame.isActive ? (
                    <Box
                      position={"absolute"}
                      fontSize="smaller"
                      bottom="2"
                      right={"2"}
                    >
                      <Box
                        bg={theme.bgColor}
                        px={"3"}
                        py="2"
                        borderRadius={"md"}
                        opacity={0.8}
                      >
                        <Text color={theme.highLightColor} fontWeight={"bold"}>
                          Coming Soon
                        </Text>
                      </Box>
                    </Box>
                  ) : (
                    <Box position={"absolute"} bottom="2" right={"2"}>
                      <Button
                        size={"sm"}
                        variant={"ghost"}
                        _hover={{
                          color: theme.primaryColor,
                          bg: theme.bgColor,
                        }}
                        bg={theme.bgColor}
                        opacity={0.8}
                        color={theme.highLightColor}
                        onClick={() => openModal(axleGame, index)}
                      >
                        Play Now{" "}
                      </Button>
                    </Box>
                  )}
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default GamesLayout;
