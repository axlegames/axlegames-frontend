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
      size={"lg"}
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
            cursor={"pointer"}
            onClick={() => {
              window.open("https://axlegames.io/staking", "_blank");
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
