import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

interface Props {
  open: boolean;
  close: Function;
  title: string;
  description: string;
}

const Dialog = (props: Props) => {
  return (
    <Modal isCentered={true} isOpen={props.open} onClose={() => props.close()}>
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
          <Text>{props.description}</Text>
          <Divider my="8"></Divider>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            colorScheme="blue"
            mr={3}
            onClick={() => props.close()}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Dialog;
