import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { theme } from "../../config/theme.config";

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
      <ModalOverlay />
      <ModalContent
        borderRadius={"xl"}
        bg={theme.fgColor}
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
