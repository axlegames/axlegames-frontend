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
} from "@chakra-ui/react";
import EntryCard from "../components/EntryCard";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../config/theme.config";
import { WordleServices } from "../../Wordle/WordleServices";
import { useState } from "react";

import Dialog from "./Dailog";
import AuthDialog from "../../Auth/Dialog";
import Signin from "../../Auth/Signin";

const GameEntryModal = (props: any) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [dialog, setDialog] = useState(false);
  const [loginDialog, setLoginDialog] = useState(false);

  function goToPage() {
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
              <EntryCard
                fee={0}
                prize={3}
                players={10}
                action={() => goToPage()}
                isLive={true}
              />
              <EntryCard fee={10} prize={20} players={20} isLive={false} />
              <EntryCard fee={15} prize={30} players={15} isLive={false} />
              <EntryCard fee={20} prize={30} players={10} isLive={false} />
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
