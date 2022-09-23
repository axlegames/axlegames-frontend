import { Box, Flex, Text } from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineQuestion } from "react-icons/ai/index";
import { IoMdSettings } from "react-icons/io/index";
import { ImStatsDots } from "react-icons/im/index";
import { theme } from "../../../../config/theme.config";
import MenuModal from "../modals/MenuModal";
import HowToPlayModal from "../modals/HowToPlayModal";
import { useState } from "react";

const Navbar = () => {
  const [howToPlayModal, setHowToPlayModal] = useState(false);

  return (
    <Box
      shadow={"dark-lg"}
      fontFamily={"quicksand"}
      fontWeight="bold"
      bg={theme.fgColor}
      color={theme.highLightColor}
      width="100%"
      py={{ base: "2" }}
      px={{ base: "3" }}
    >
      <MenuModal
        title={"How To Play?"}
        isOpen={howToPlayModal}
        close={() => setHowToPlayModal(false)}
        onClick={() => setHowToPlayModal(false)}
        children={<HowToPlayModal></HowToPlayModal>}
      />
      <Flex alignItems={"center"} justifyContent={{ base: "space-between" }}>
        <Flex columnGap={{ base: ".8rem" }} alignItems={"center"}>
          <AiOutlineMenu size={26} />
          <Text textAlign={"center"} fontSize={{ base: "2xl" }}>
            Wordle#5
          </Text>
        </Flex>

        <Flex columnGap={{ base: "2" }}>
          <AiOutlineQuestion
            onClick={() => setHowToPlayModal(true)}
            size={26}
          />
          <ImStatsDots size={26} />
          <IoMdSettings size={26} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
