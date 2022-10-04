import { Box, Flex, Text } from "@chakra-ui/react";
import { AiOutlineQuestion } from "react-icons/ai/index";

import { BiArrowBack } from "react-icons/bi/index";
import { IoMdSettings } from "react-icons/io/index";
import { ImStatsDots } from "react-icons/im/index";
import { theme } from "../../../config/theme.config";
import MenuModal from "../modals/MenuModal";
import HowToPlayModal from "../modals/HowToPlayModal";
import { useState } from "react";
import { useNavigate } from "react-router";

const Navbar = (props: any) => {
  const [howToPlayModal, setHowToPlayModal] = useState(false);
  const navigate = useNavigate();

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
        <Flex>
          <BiArrowBack onClick={() => navigate("/")} size={42} />
        </Flex>
        <Flex columnGap={{ base: ".8rem" }} alignItems={"center"}>
          <Text textAlign={"center"} fontSize={{ base: "2xl", lg: "4xl" }}>
            {props.title.replace("-", "#")}
          </Text>
        </Flex>

        <Flex columnGap={{ base: "2" }}>
          <AiOutlineQuestion
            onClick={() => setHowToPlayModal(true)}
            size={30}
          />
          <ImStatsDots size={30} />
          <IoMdSettings size={30} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
