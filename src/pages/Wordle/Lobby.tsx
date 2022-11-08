import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { theme } from "../../config/theme.config";
import { WordleServices, Contest } from "./WordleServices";

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
        console.log(res);
        setContest(res);
        setTimeout(() => {
          setIsLoaded(true);
        }, 2000);
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
      console.log(time);
      if (time < 0)
        return navigate(
          `/${params.game}/${params.contestId}/${params.gameStateId}`
        );
    };

    useEffect(() => {
      const interval = setInterval(() => getTime(), 1000);
      return () => clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const timer = `Game starts in ${minutes}m ${seconds}s`;

    return (
      <Box justifyContent={"center"}>
        <Text textAlign={"center"} fontSize={"3xl"}>
          {isLoaded ? timer : "Loading..."}
        </Text>
      </Box>
    );
  };
  const contestants = contest?.axleContestants.length || 0;
  return (
    <Box
      bg={theme.fgColor}
      fontFamily="quicksand"
      color={theme.secondaryTwoTextColor}
      fontWeight="bold"
    >
      <Timer
        deadline={contest?.axleContestInfo.expiresAt || ""}
        opensAt={contest?.axleContestInfo.opensAt || ""}
        startsOn={contest?.axleContestInfo.startsOn || ""}
      />
      <Box
        flexDirection={"column"}
        alignItems="center"
        display={"flex"}
        justifyContent="center"
      >
        <Text>Contestants {contestants}</Text>
        <Text>
          Prize Pool {contest?.axleContestInfo.entryFee || 0 / contestants}
        </Text>
      </Box>
    </Box>
  );
};

export default Lobby;
