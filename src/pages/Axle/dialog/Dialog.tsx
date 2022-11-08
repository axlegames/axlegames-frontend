import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

interface Props {
  isOpen: boolean;
  close: Function;
  children: any;
  size?: string;
}

const Dialog = (props: Props) => {
  return (
    <Modal
      size={props.size ?? "sm"}
      isOpen={props.isOpen}
      onClose={() => props.close()}
    >
      <ModalOverlay backdropFilter="blur(5px) hue-rotate(0deg)" />
      <ModalContent
        borderRadius={"xl"}
        bg={"#262442"}
        color={theme.highLightColor}
        fontFamily={"quicksand"}
        fontWeight="bold"
      >
        <ModalCloseButton />
        <ModalBody>{props.children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Dialog;
