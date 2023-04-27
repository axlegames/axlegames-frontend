import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

import Ban from "./banner.png";

interface Props {
  isOpen: boolean;
  close: Function;
  size?: string;
}

const Banner = (props: Props) => {
  return (
    <Modal
      size={"4xl"}
      isOpen={props.isOpen}
      onClose={() => {
        props.close();
      }}
      isCentered={true}
    >
      <ModalOverlay backdropFilter="blur(5px) hue-rotate(0deg)" />
      <ModalContent background={"none"} boxShadow="none">
        <ModalBody>
          <Image
            onClick={() => {
              window.open(
                "https://www.pinksale.finance/launchpad/0x8261A864541081B45c6e12e7b11e46D1Ab977fC2?chain=BSC",
                "_blank"
              );
              props.close();
            }}
            src={Ban}
            borderRadius="xl"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Banner;
