import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { theme } from "../../../../config/theme.config";
import { GameServices, LobbyInterface } from "../../GameServices";
import ETH from "../../../../assets/logos/trophy.webp";
import { TokenAuthStatus } from "../../../../config/auth";

interface Props {
  lobby?: LobbyInterface;
  params: any;
  isLoaded: boolean;
  navigate: Function;
}

const Timer = (props: Props) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [currentTime, setCurrentTime] = useState(
    new Date(props.lobby?.currentTime || Date.now()).getTime()
  );

  useEffect(() => {
    const getTime = () => {
      const time =
        Date.parse(props.lobby?.contest.axleContestInfo.opensAt || "") -
        currentTime;
      const _currentTime = currentTime + 1000;
      setCurrentTime(_currentTime);
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
      if (time < 0) {
        return props.navigate(
          `/${props.params.game}/${props.params.contestId}/${
            props.params.gameStateId
          }/${true}`
        );
      }
    };
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, [currentTime, props]);

  return (
    <Box>
      <Box
        fontSize={"4xl"}
        color={theme.secondaryTextColor}
        display={"flex"}
        columnGap="1rem"
        fontFamily={"'Russo One', sans-serif"}
      >
        <Box
          minW="32"
          maxW={"32"}
          p={4}
          backgroundImage={`radial-gradient(circle, #1442b5, #003b96, #003376, #002956, #061e37)`}
          borderRadius="md"
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
        >
          {minutes === 0 ? minutes : "0" + minutes.toString()}m
        </Box>
        <Box
          minW="32"
          maxW={"32"}
          p={4}
          backgroundImage={`radial-gradient(circle, #1442b5, #003b96, #003376, #002956, #061e37)`}
          borderRadius="md"
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
        >
          {seconds.toString().length === 0 ? "0" + seconds.toString() : seconds}
          s
        </Box>
      </Box>
    </Box>
  );
};

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

  const contestants = lobby?.contest.axleContestants.length || 0;
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
          backgroundImage={`radial-gradient(circle, #1442b5, #003b96, #003376, #002956, #061e37)`}
          borderRadius="xl"
          display="flex"
          flexDirection={"column"}
          position="relative"
          minW={{ base: "320px", md: "820px" }}
          minH={{ base: "auto", md: "640px" }}
          border={`4px groove ${theme.primaryTextColor}`}
          boxShadow={`0px 0px 160px -40px ${theme.primaryTextColor}`}
          alignItems="center"
        >
          <Image
            src={ETH}
            boxShadow={`0px 0px 120px -5px ${theme.primaryTextColor}`}
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
                {contestants}+
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
                {lobby?.contest.axleContestInfo.entryFee || 0 / contestants}
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
            <Timer
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
