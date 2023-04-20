import { Box, Flex, Grid, Text } from "@chakra-ui/react";

import { BiArrowBack } from "react-icons/bi/index";
import { theme } from "../../../config/theme.config";
import { useState } from "react";

import MenuModal from "../modals/MenuModal";
import HowToPlayModal from "../modals/HowToPlayModal";
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
        children={<HowToPlayModal game={props.game}></HowToPlayModal>}
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
          fontSize={{ base: "xl" }}
          px={8}
        >
          <Text>Hello, {props.username}</Text>
          <Box
            position={"fixed"}
            bottom="4%"
            right={"4%"}
            display={{ base: "none", lg: "block" }}
            onClick={() => setHowToPlayModal(true)}
            cursor="pointer"
            zIndex={1000}
          >
            <Box
              px={6}
              py={2}
              bg={theme.bgColor}
              fontFamily={`'Russo One', sans-serif`}
              color={theme.primaryTwoTextColor}
              border={`2px groove ${theme.primaryTwoTextColor}`}
              borderRadius="sm"
              cursor="pointer"
              display={"flex"}
              _hover={{
                textDecoration: "underline",
              }}
              alignItems={"center"}
              columnGap={".25rem"}
            >
              {/* <LinkIcon /> */}
              <Text fontSize={{ base: "xs", md: "sm", lg: "md" }}>
                How To play?
              </Text>
            </Box>
          </Box>
        </Flex>
      </Grid>
    </Box>
  );
};

export default Navbar;
