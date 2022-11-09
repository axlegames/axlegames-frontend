import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { theme } from "../../config/theme.config";
import { WordleServices, Contest } from "./WordleServices";
import ETH from "../../assets/logos/trophy.webp";
import BNB from "../../assets/logos/alram.webp";

interface Props {
  deadline: string;
  startsOn: string;
  opensAt: string;
}

const Lobby = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [contest, setContest] = useState<Contest>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const contestId = params.contestId || "";
    WordleServices.getLobbyStats(contestId)
      .then((res) => {
        setContest(res);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [params.contestId]);

  const Timer = (props: Props) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const getTime = () => {
      const time =
        Date.parse(contest?.axleContestInfo.opensAt || "") -
        new Date().getTime();
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
      if (time < 0) {
        return navigate(
          `/${params.game}/${params.contestId}/${params.gameStateId}`
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
      <Text color={theme.secondaryTextColor} fontSize={"xl"}>
        {timer}
      </Text>
    );
  };
  const contestants = contest?.axleContestants.length || 0;
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
        minW={"450px"}
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
          fontSize={"3xl"}
        >{`#${params.game} Lobby`}</Text>
        <Timer
          deadline={contest?.axleContestInfo.expiresAt || ""}
          opensAt={contest?.axleContestInfo.opensAt || ""}
          startsOn={contest?.axleContestInfo.startsOn || ""}
        />
        <Box
          bg={theme.bgColor}
          borderRadius="xl"
          mx={4}
          mt={4}
          display={"flex"}
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
              {" "}
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
              {contest?.axleContestInfo.entryFee || 0 / contestants}
            </Text>
            <Text color={theme.secondaryTwoTextColor}>Prize Pool </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Lobby;
