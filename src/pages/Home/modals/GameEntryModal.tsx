import {
  ModalCloseButton,
  useMediaQuery,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useToast,
  Divider,
  Modal,
  Text,
  Grid,
  Box,
} from "@chakra-ui/react";

import EntryCard from "../components/EntryCard";

import { useNavigate } from "react-router-dom";
import { theme } from "../../../config/theme.config";

import {
  EntryStatus,
  ENTRY_STATUS,
  GameServices,
} from "../../Games/GameServices";

import { GameType } from "../enums/contests.enum";
import { useEffect, useState } from "react";
import { AxleContest, AxleContests, HomeServices } from "../HomeServices";

import Signin from "../../Auth/Signin";
import Dialog from "./HomeDailog";
import AuthDialog from "../../Auth/dialogs/AuthDialog";
import ConfirmDialog from "./ConfirmDialog";

import NeuButton from "../../Axle/component/NeuButton";
import { TokenAuthStatus } from "../../../config/auth";

import TryNow from "../components/TryNow";
import AIEntryCard from "../components/AIEntryCard";

interface Props {
  open: boolean;
  close: Function;
  name: string;
  isActive: boolean;
  index: number;
  _id: string;
  description: string;
  link: string;
}

const GameEntryModal = (props: Props) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [tryM, setTryM] = useState(false);
  const [guest, setGuest] = useState({
    contestId: "",
    link: "",
  });

  const [dialog, setDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [loginDialog, setLoginDialog] = useState(false);
  const [header, setHeader] = useState("");
  const [message, setMessage] = useState("");
  const [contest, setContest] = useState({
    _id: "",
    fee: 0,
  });

  const [isMobile] = useMediaQuery("(max-width: 600px)");
  const [practiceContests, setPracticeContests] = useState<AxleContests>();
  const [gameNightContests, setGameNightContests] = useState<AxleContests>();

  function sort(a: AxleContest, b: AxleContest) {
    if (a.gameType === GameType.PRACTICE) return 0;
    if (a.gameType === GameType.GAMIN_NIGHTS) return -1;
    if (a.gameType === GameType.CONTEST) return 1;
    return 0;
  }

  function filterFreeAndSpecialContests(
    contests: Array<AxleContest>
  ): Array<AxleContest> {
    const results = [];
    for (let i = 0; i < contests.length; i++)
      if (
        contests[i].gameType.toString() === GameType.GAMIN_NIGHTS ||
        contests[i].gameType.toString() === GameType.CHALLENGE ||
        contests[i].gameType.toString() === GameType.PRACTICE
      )
        results.push(contests[i]);
    return results;
  }

  useEffect(() => {
    if (props.open) {
      HomeServices.getAxleGameContest(props._id, "practice").then((res) => {
        const results = filterFreeAndSpecialContests(res.axleContests);
        results.sort(sort);
        setPracticeContests({
          ...res,
          axleContests: results,
        });
      });
      HomeServices.getAxleGameContest(props._id, "gamenights").then((res) => {
        const results = filterFreeAndSpecialContests(res.axleContests);
        results.sort(sort);
        setGameNightContests({
          ...res,
          axleContests: results,
        });
      });
    }
    return () => {};
  }, [props.open, props._id]);

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

  const handleEntryStatus = (
    res: EntryStatus | TokenAuthStatus,
    fee: number
  ) => {
    isAuthorized(res as TokenAuthStatus);
    res = res as EntryStatus;
    const status = res.status.valueOf().toString();
    const toString = (entryStatus: ENTRY_STATUS): string => {
      return entryStatus.valueOf().toString();
    };
    if (status === toString(ENTRY_STATUS.OK)) {
      setHeader("Confirm Entry");
      setMessage(
        `By confirming entry ${fee} AXLE, will be deducted from your wallet.`
      );
      setDialog(false);
      return setConfirm(true);
    }
    if (status === toString(ENTRY_STATUS.ALREADY_IN_OTHER_GAME)) {
      const type = res.type === GameType.PRACTICE ? "practice" : "contest";
      setHeader("Oops!");
      setMessage(
        `Your are already playing ${res.name} ${type} game, please finish it and come back`
      );
      return setDialog(true);
    }
    if (
      status === toString(ENTRY_STATUS.ALREADY_PARTICIPATED_IN_THIS_CONTEST)
    ) {
      setHeader("Oops!!");
      setMessage(
        "You already participated in this contest, try another contest"
      );
      return setDialog(true);
    }
    if (status === toString(ENTRY_STATUS.CONTEST_DOESNOT_EXIST)) {
      setHeader("Oops!!");
      setMessage("Invalid entry, contest does not exist");
      return setDialog(true);
    }
    if (status === toString(ENTRY_STATUS.IN_SUFFICENT_FUNDS)) {
      setHeader("Insufficent Funds");
      setMessage("Please, add some funds to wallet, for entering into game");
      return setDialog(true);
    }
    if (status === toString(ENTRY_STATUS.WALLET_DOESTNOT_EXIST)) {
      setHeader("Unauthorized Access");
      setMessage("Oops! unauthorized access, please retry again");
      return setDialog(true);
    }
    if (status === toString(ENTRY_STATUS.PRACTICE_GAME)) {
      const gameStateId = res.gameState._id;
      const contestId = res.gameState.axleContest;
      setDialog(false);
      setConfirm(false);
      return navigate(`${props.link}/${contestId}/${gameStateId}/${false}`);
    }
    if (
      status === toString(ENTRY_STATUS.ALREADY_IN_GAME) ||
      status === toString(ENTRY_STATUS.ENTER_CONTEST)
    ) {
      const gameStateId = res.gameState._id;
      const contestId = res.gameState.axleContest;
      setDialog(false);
      setConfirm(false);
      return navigate(`${props.link}/lobby/${contestId}/${gameStateId}`);
    }
  };

  function enterContest(d: any, confirm: boolean) {
    const user = localStorage.getItem("userId");
    const gameType =
      d?.gameType.valueOf().toString() ===
      GameType.GAMIN_NIGHTS.valueOf().toString();
    if (user === null && !gameType) {
      setTryM(true);
      setGuest({
        contestId: d._id,
        link: props.link,
      });
      return;
    }
    if (user === null && gameType) {
      const address = localStorage.getItem("address");
      const notConnected = address === "undefined";
      return toast({
        title: !notConnected ? "Login" : "Connect Wallet",
        description: !notConnected
          ? "Please Login, to enter contest"
          : "Please Connect your wallet",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    let fee = 0;
    let _id = d?._id;
    if (gameType) {
      fee = d.axleContestInfo?.entryFee || contest.fee;
    }
    if (confirm === true) {
      _id = contest._id;
      fee = contest.fee;
    } else {
      setContest({
        _id: d._id,
        fee: fee,
      });
    }
    if (confirm) setConfirm(false);
    if (user) {
      return GameServices.enterContest({
        contestId: _id,
        userId: localStorage.getItem("userId"),
        confirm: confirm,
      })
        .then((res) => handleEntryStatus(res, fee))
        .catch((err) => {
          console.log(err);
        });
    }
    if (!isMobile) {
      const address = localStorage.getItem("address");
      if (!address || address === "undefined" || address === "null")
        return toast({
          title: "Connect Wallet",
          description: "Connect with your wallet",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
    }
    return setLoginDialog(true);
  }

  return (
    <Modal
      blockScrollOnMount={false}
      size={"4xl"}
      isOpen={props.open}
      onClose={() => props.close()}
    >
      <ModalOverlay backdropFilter="blur(4px) hue-rotate(0deg)" />
      <ModalContent
        borderRadius={"xl"}
        color="#fbd6d2"
        fontFamily={"quicksand"}
        fontWeight="bold"
        bg={theme.bgColor}
        backgroundImage={`https://axlegames.s3.ap-south-1.amazonaws.com/assets/bg/token_countdown_bg.png`}
      >
        <Dialog
          title={header}
          description={message}
          open={dialog}
          close={() => {
            setMessage("");
            setDialog(false);
          }}
        />
        <Dialog
          title={header}
          description={message}
          open={errorDialog}
          close={() => {
            setMessage("");
            setErrorDialog(false);
          }}
        />

        <ConfirmDialog
          open={confirm}
          close={() => setConfirm(false)}
          description={message}
          enterContest={() => enterContest(null, true)}
          title={header}
        />
        <TryNow
          contestId={guest.contestId}
          link={guest.link}
          name={props.name}
          isOpen={tryM}
          key={0}
          close={() => setTryM(false)}
        />
        <AuthDialog
          children={<Signin />}
          isOpen={loginDialog}
          close={() => setLoginDialog(false)}
          size="md"
        />
        <ModalHeader fontSize={"5xl"}> {props.name} </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{props.description}</Text>
          <Divider
            py={1}
            my={8}
            backgroundImage={`linear-gradient(to top, #eb6612, #ee2e4c, #d4007c, #9828a3, #1442b5)`}
            borderRadius={"xl"}
          />

          {props.isActive ? (
            <Grid
              justifyContent={"space-between"}
              columnGap="3rem"
              rowGap={"3rem"}
              alignItems="center"
              gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
              px={4}
            >
              {practiceContests?.axleContests.map((d, i) => (
                <Box width={"100%"} key={i}>
                  <EntryCard
                    index={i}
                    name={props.name}
                    currentTime={practiceContests.currentTime}
                    contest={d}
                    action={() => enterContest(d, false)}
                  />
                </Box>
              ))}

              {gameNightContests?.axleContests.map((d, i) => (
                <Box width={"100%"} key={i}>
                  <AIEntryCard
                    index={i}
                    name={props.name}
                    currentTime={gameNightContests.currentTime}
                    contest={d}
                    action={() => enterContest(d, false)}
                  />
                </Box>
              ))}
            </Grid>
          ) : (
            <Box>
              <Text>Coming Soon</Text>
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <NeuButton
            label="close"
            onClick={props.close}
            bg={"#40464F"}
            shadow={"#535A65"}
          ></NeuButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameEntryModal;
