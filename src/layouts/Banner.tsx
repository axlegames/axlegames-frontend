import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

import Ban from "./banner.jpg";

interface Props {
  isOpen: boolean;
  close: Function;
  size?: string;
}

const Banner = (props: Props) => {
  return (
    <Modal
      size={props.size ?? "sm"}
      isOpen={props.isOpen}
      onClose={() => props.close()}
      isCentered={true}
    >
      <ModalOverlay backdropFilter="blur(5px) hue-rotate(0deg)" />
      <ModalContent background={"none"} boxShadow="none">
        <ModalBody>
          <a
            style={{ outline: "none", border: "none" }}
            href={`https://sale.axlegames.io`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Ban} borderRadius="xl" />
          </a>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Banner;
