import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { theme } from "../../../config/theme.config";

const MenuModal = (props: any) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.close}>
      <ModalOverlay />
      <ModalContent
        borderRadius={"xl"}
        bg={theme.fgColor}
        color={theme.highLightColor}
        fontFamily={"quicksand"}
        fontWeight="bold"
      >
        <ModalHeader fontSize={"5xl"}> {props.title} </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          <Button size="sm" colorScheme="blue" mr={3} onClick={props.close}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MenuModal;
