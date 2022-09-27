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
} from "@chakra-ui/react";
import EntryCard from "../components/EntryCard";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../config/theme.config";
import { WordleServices } from "../../Game/Wordle/WordleServices";

const GameEntryModal = (props: any) => {
  const navigate = useNavigate();

  function goToPage() {
    WordleServices.enterContest({
      gameTypeId: props._id,
      userId: localStorage.getItem("userId"),
    })
      .then((res) => {
        if (res.data.error) {
          console.log("COMPLETE CURRENT GAME");
          return;
        }
        const link = `${props.link}/${res.data.axleContest}/${res.data._id}`;
        navigate(link);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <Button size="sm" colorScheme="blue" mr={3} onClick={props.close}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameEntryModal;
