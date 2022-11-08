import {
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
import NeuButton from "../../Axle/component/NeuButton";

interface Props {
  open: boolean;
  close: Function;
  title: string;
  description: string;
  enterContest: Function;
}

const ConfirmDialog = (props: Props) => {
  return (
    <Modal isCentered={true} isOpen={props.open} onClose={() => props.close()}>
      <ModalOverlay backdropFilter="blur(4px) hue-rotate(0deg)" />
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
          <NeuButton
            bg={theme.fgColor}
            onClick={() => props.enterContest()}
            label="confirm"
          ></NeuButton>
          <NeuButton
            bg={theme.ternaryButtonColor}
            onClick={() => props.close()}
            label="close"
          ></NeuButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDialog;
