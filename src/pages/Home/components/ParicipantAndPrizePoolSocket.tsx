import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const ParticipantCountAndPrizePoolSocket = (props: {
  contestId: string;
  isParticipantCount: boolean;
}) => {
  const [liveActions, setLiveActions] = useState({
    prizePool: 0,
    participants: 0,
  });

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `wss://api.axlegames.io`
  );
  useEffect(() => {
    sendMessage(props.contestId);
    const resp = lastMessage?.data;
    try {
      const live = JSON.parse(resp.replace("/", ""));
      setLiveActions({
        participants: live.participants,
        prizePool: live.prizePool,
      });
    } catch (error) {}
  }, [readyState, lastMessage, props, sendMessage]);

  return props.isParticipantCount ? (
    <Box>{liveActions.participants} + playing now</Box>
  ) : (
    <Box> {liveActions.prizePool} </Box>
  );
};
export default ParticipantCountAndPrizePoolSocket;
