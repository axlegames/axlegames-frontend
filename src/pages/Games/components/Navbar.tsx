import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { AiOutlineQuestion } from "react-icons/ai/index";

import { BiArrowBack } from "react-icons/bi/index";
import { IoMdSettings } from "react-icons/io/index";
import { ImStatsDots } from "react-icons/im/index";
import { theme } from "../../../config/theme.config";
import { useState } from "react";
import { useNavigate } from "react-router";
import MenuModal from "../modals/MenuModal";
import HowToPlayModal from "../modals/HowToPlayModal";

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
      <Grid
        alignItems={"center"}
        justifyContent={"center"}
        gridTemplateColumns={"1fr 1fr 1fr"}
      >
        <Flex>
          <BiArrowBack
            cursor={"pointer"}
            onClick={() => navigate("/")}
            size={42}
          />
        </Flex>
        <Flex
          justifyContent={"center"}
          columnGap={{ base: ".8rem" }}
          alignItems={"center"}
        >
          <Text
            cursor={"pointer"}
            textAlign={"center"}
            fontSize={{ base: "2xl", lg: "4xl" }}
          >
            {props.title.replace("-", " #")}
          </Text>
        </Flex>

        <Flex
          justifyContent={"flex-end"}
          textAlign={"center"}
          alignItems="center"
          columnGap={{ base: "2" }}
        >
          <Text>Hello, {props.username}</Text>
          <AiOutlineQuestion
            cursor={"pointer"}
            onClick={() => setHowToPlayModal(true)}
            size={30}
          />
          <ImStatsDots cursor={"pointer"} size={30} />
          <IoMdSettings cursor={"pointer"} size={30} />
        </Flex>
      </Grid>
    </Box>
  );
};

export default Navbar;
