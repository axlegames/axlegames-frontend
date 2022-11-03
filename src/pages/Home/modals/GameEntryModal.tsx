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
  Button,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import EntryCard from "../components/EntryCard";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../config/theme.config";
import { WordleServices } from "../../Wordle/WordleServices";
import { useEffect, useState } from "react";

import Dialog from "./Dailog";
import AuthDialog from "../../Auth/dialogs/Dialog";
import Signin from "../../Auth/Signin";
import { AxleContests, HomeServices } from "../HomeServices";

export enum GameStatus {
  EXPIRED,
  LIVE,
  NEXT,
}

const GameEntryModal = (props: any) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [dialog, setDialog] = useState(false);
  const [loginDialog, setLoginDialog] = useState(false);

  const [isMobile] = useMediaQuery("(max-width: 600px)");
  const [contest, setContests] = useState<AxleContests>();

  useEffect(() => {
    if (props.open) {
      HomeServices.getAxleGameContest(props._id).then((res) => {
        setContests(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  function enterContest() {
    const user = localStorage.getItem("userId");
    if (user)
      return WordleServices.enterContest({
        gameTypeId: props._id,
        userId: localStorage.getItem("userId"),
      })
        .then((res) => {
          if (res.data.error) {
            return setDialog(true);
          }
          const link = `${props.link}/${res.data.axleContest}/${res.data._id}`;
          navigate(link);
        })
        .catch((err) => {
          console.log(err);
        });

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
      <ModalOverlay />
      <ModalContent
        borderRadius={"xl"}
        bg={theme.fgColor}
        color="#fbd6d2"
        fontFamily={"quicksand"}
        fontWeight="bold"
      >
        <Dialog
          title={"Warning"}
          description={`your are currently playing another game, finsih it and come back again.`}
          open={dialog}
          close={() => setDialog(false)}
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
              {contest?.axleContests.map((d, i) => (
                <EntryCard key={i} {...d} action={enterContest} />
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
          <Button
            size="sm"
            width={"32"}
            colorScheme="blue"
            mr={3}
            onClick={props.close}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameEntryModal;
