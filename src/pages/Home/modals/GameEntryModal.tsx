import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  Divider,
  Flex,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import EntryCard from "../components/EntryCard";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../config/theme.config";
import {
  EntryStatus,
  ENTRY_STATUS,
  GameServices,
} from "../../Games/GameServices";
import { useEffect, useState } from "react";

import Dialog from "./HomeDailog";
import AuthDialog from "../../Auth/dialogs/AuthDialog";
import Signin from "../../Auth/Signin";
import { AxleContests, HomeServices } from "../HomeServices";
import ConfirmDialog from "./ConfirmDialog";
import { GameType } from "../enums/contests.enum";
import NeuButton from "../../Axle/component/NeuButton";
import { TokenAuthStatus } from "../../../config/auth";

const GameEntryModal = (props: any) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [dialog, setDialog] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [loginDialog, setLoginDialog] = useState(false);
  const [header, setHeader] = useState("");
  const [message, setMessage] = useState("");
  const [contest, setContest] = useState({
    _id: "",
    fee: 0,
  });

  const [isMobile] = useMediaQuery("(max-width: 600px)");
  const [contests, setContests] = useState<AxleContests>();

  useEffect(() => {
    if (props.open) {
      HomeServices.getAxleGameContest(props._id).then((res) => {
        setContests(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  const isAuthorized = (status: TokenAuthStatus) => {
    if (
      status.valueOf().toString() ===
      TokenAuthStatus.UNAUTHORIZED.valueOf().toString()
    ) {
      localStorage.clear();
      return navigate("/");
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
      setHeader("Oops!");
      setMessage(
        "Your are already playing another game, please finish it and come back"
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
    let fee = 0;
    let _id = d?._id;

    if (
      d?.gameType.valueOf().toString() === GameType.CONTEST.valueOf().toString()
    ) {
      fee = d.axleContestInfo?.entryFee || contest.fee;
    }

    const user = localStorage.getItem("userId");

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
    <Modal isOpen={props.open} onClose={props.close}>
      <ModalOverlay backdropFilter="blur(4px) hue-rotate(0deg)" />
      <ModalContent
        borderRadius={"xl"}
        color="#fbd6d2"
        fontFamily={"quicksand"}
        fontWeight="bold"
        bg={theme.modalBgColor}
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
        <ConfirmDialog
          open={confirm}
          close={() => setConfirm(false)}
          description={message}
          enterContest={() => enterContest(null, true)}
          title={header}
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
          <Box>
            <Text>{props.description}</Text>
          </Box>
          <Divider my="8"></Divider>

          {props.isActive ? (
            <Flex direction={"column"} rowGap="2rem">
              {contests?.axleContests.map((d, i) => (
                <Box key={i}>
                  <EntryCard {...d} action={() => enterContest(d, false)} />
                </Box>
              ))}
              <Divider />
            </Flex>
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
