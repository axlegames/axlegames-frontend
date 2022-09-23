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

const GameEntryModal = (props: any) => {
  const navigate = useNavigate();

  function goToPage() {
    navigate(props.url);
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
        <ModalHeader fontSize={"5xl"}> {props.title} </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text>{props.content}</Text>
          </Box>
          <Divider my="8"></Divider>
          {props.gridItem === 1 ? (
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
