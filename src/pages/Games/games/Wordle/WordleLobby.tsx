import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { theme } from "../../../../config/theme.config";
import { GameServices, LobbyInterface } from "../../GameServices";
import ETH from "../../../../assets/logos/trophy.webp";
import { TokenAuthStatus } from "../../../../config/auth";
import ParticipantCountAndPrizePoolSocket from "../../../Home/components/ParicipantAndPrizePoolSocket";
import WordleLobbyTimer from "./WordleLobbyTimer";

const WordleLobby = () => {
  const params = useParams();
  const [lobby, setLobby] = useState<LobbyInterface>();
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();
  const isAuthorized = (status: TokenAuthStatus) => {
    if (
      status.valueOf().toString() ===
      TokenAuthStatus.UNAUTHORIZED.valueOf().toString()
    ) {
      localStorage.clear();
      navigate("/");
      return window.location.reload();
    }
  };

  useEffect(() => {
    const contestId = params.contestId || "";
    GameServices.getLobbyStats(contestId)
      .then((res) => {
        isAuthorized(res as TokenAuthStatus);
        setLobby(res as LobbyInterface);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.contestId]);

  return (
    <Box
      bg={theme.bgColor}
      backgroundImage={`https://axlegames.s3.ap-south-1.amazonaws.com/assets/bg/token_countdown_bg.png`}
      minH={"100vh"}
      minW={"100vw"}
      backgroundSize="cover"
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
    >
      <Box
        fontFamily="quicksand"
        fontWeight="bold"
        justifyContent="center"
        display={"flex"}
        alignItems="center"
      >
        <Box
          my={16}
          py={10}
          px={16}
          backgroundImage={`linear-gradient(to bottom, #061e37, #002956, #003376, #003b96, #1442b5)`}
          borderRadius="xl"
          display="flex"
          flexDirection={"column"}
          position="relative"
          minW={{ base: "320px", md: "820px" }}
          minH={{ base: "auto", md: "640px" }}
          // border={`6px groove ${theme.fgColor}`}
          boxShadow={`0px 0px 160px -40px #1442b5`}
          alignItems="center"
        >
          <Image
            src={ETH}
            boxShadow={`0px 0px 120px -5px #1442b5`}
            borderRadius="40vw"
            p={6}
            height={{ base: "32", lg: "48" }}
            width={{ base: "32", lg: "48" }}
          />
          <Text
            fontFamily={"'Russo One', sans-serif"}
            color={theme.primaryTextColor}
            fontSize={{ base: "3xl", lg: "5xl", xl: "7xl" }}
          >{`#${params.game} Lobby`}</Text>

          <Box
            boxShadow={`0px 0px 24px -4px ${theme.bgColor}`}
            backgroundImage={`radial-gradient(circle, #1442b5, #003b96, #003376, #002956, #061e37)`}
            borderRadius="xl"
            mx={4}
            mt={4}
            display={"flex"}
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-between"
            p={4}
            width="100%"
          >
            <Box
              display={"flex"}
              flexDirection="column"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text color={theme.secondaryTextColor} fontSize="2xl">
                {" "}
                <ParticipantCountAndPrizePoolSocket
                  isParticipantCount={true}
                  contestId={params.contestId || ""}
                />
              </Text>
              <Text
                fontFamily={"'Russo One', sans-serif"}
                color={theme.primaryTwoTextColor}
              >
                Contestants
              </Text>
            </Box>
            <Box
              display={"flex"}
              flexDirection="column"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text color={theme.secondaryTextColor} fontSize="2xl">
                <ParticipantCountAndPrizePoolSocket
                  isParticipantCount={false}
                  contestId={params.contestId || ""}
                />
              </Text>
              <Text
                fontFamily={"'Russo One', sans-serif"}
                color={theme.primaryTwoTextColor}
              >
                Prize Pool{" "}
              </Text>
            </Box>
          </Box>
          <Box my={5}>
            <Text
              textAlign={"center"}
              color={theme.primaryTextColor}
              fontSize={"3xl"}
            >
              Game Starts in
            </Text>
            <WordleLobbyTimer
              params={params}
              navigate={navigate}
              lobby={lobby}
              isLoaded={isLoaded}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WordleLobby;
