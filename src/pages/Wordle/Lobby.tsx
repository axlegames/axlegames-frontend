import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { WordleServices, Contest } from "./WordleServices";

interface Props {
  deadline: string;
  startsOn: string;
  opensAt: string;
}

const Lobby = () => {
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
    };

    useEffect(() => {
      setTimeout(() => {
        setIsLoaded(true);
      }, 1500);
      const interval = setInterval(() => getTime(), 1000);
      return () => clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const timer = `Expires In ${minutes}m ${seconds}s`;

    return (
      <Box>
        <Text>{timer}</Text>
      </Box>
    );
  };
  return (
    <Box>
      {isLoaded ? (
        <Timer
          deadline={contest?.axleContestInfo.expiresAt || ""}
          opensAt={contest?.axleContestInfo.opensAt || ""}
          startsOn={contest?.axleContestInfo.startsOn || ""}
        />
      ) : null}
    </Box>
  );
};

export default Lobby;
