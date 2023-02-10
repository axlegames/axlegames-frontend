import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ETH from "../../../../assets/logos/trophy.webp";
import BNB from "../../../../assets/logos/alram.webp";
import { GameServices, LobbyInterface } from "../../GameServices";
import { TokenAuthStatus } from "../../../../config/auth";
import { theme } from "../../../../config/theme.config";

interface Props {
  deadline: string;
  startsOn: string;
  opensAt: string;
}

const AbsurdleLobby = () => {
  const params = useParams();
  const [contest, setContest] = useState<LobbyInterface>();
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
        setContest(res as LobbyInterface);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.contestId]);

  const Timer = (props: Props) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const getTime = () => {
      const time =
        Date.parse(contest?.contest.axleContestInfo.opensAt || "") -
        new Date().getTime();
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
      if (time < 0) {
        return navigate(
          `/absurdle/${params.contestId}/${params.gameStateId}/${true}`
        );
      }
    };

    useEffect(() => {
      const interval = setInterval(() => getTime(), 1000);
      return () => clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const timer = isLoaded
      ? `Game starts in ${minutes}m ${seconds}s`
      : "Loading";

    return (
      <Text
        color={theme.secondaryTextColor}
        fontSize={{ base: "md", xl: "xl" }}
      >
        {timer}
      </Text>
    );
  };
  const contestants = contest?.contest.axleContestants.length || 0;
  return (
    <Box
      fontFamily="quicksand"
      fontWeight="bold"
      bg={theme.bgColor}
      justifyContent="center"
      display={"flex"}
      px={12}
      py={10}
    >
      <Box
        my={16}
        py={10}
        px={16}
        bg={theme.fgColor}
        borderRadius="xl"
        display="flex"
        flexDirection={"column"}
        position="relative"
        minW={{ base: "320px", md: "450px" }}
        border={`4px groove ${theme.primaryTwoTextColor}`}
      >
        <Image
          top="-8"
          left={"-8"}
          position={"absolute"}
          src={ETH}
          height={"24"}
          width="24"
        />
        <Image
          bottom={"-8"}
          right="-8"
          position={"absolute"}
          src={BNB}
          height="24"
          width={"24"}
        />

        <Text
          color={theme.primaryTextColor}
          fontSize={{ base: "xl", md: "3xl" }}
        >{`#Absurdle Lobby`}</Text>
        <Timer
          deadline={contest?.contest.axleContestInfo.expiresAt || ""}
          opensAt={contest?.contest.axleContestInfo.opensAt || ""}
          startsOn={contest?.contest.axleContestInfo.startsOn || ""}
        />
        <Box
          bg={theme.bgColor}
          borderRadius="xl"
          mx={4}
          mt={4}
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          p={4}
        >
          <Box
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text color={theme.secondaryTextColor} fontSize="2xl">
              {contestants}+
            </Text>
            <Text color={theme.secondaryTwoTextColor}>Contestants</Text>
          </Box>
          <Box
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text color={theme.secondaryTextColor} fontSize="2xl">
              {contest?.contest.axleContestInfo.entryFee || 0 / contestants}
            </Text>
            <Text color={theme.secondaryTwoTextColor}>Prize Pool </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AbsurdleLobby;
