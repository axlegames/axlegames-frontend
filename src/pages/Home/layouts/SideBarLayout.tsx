import { Box, Flex, Button, Image, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import Logo from "../../../assets/home/logos/logo.png";

import SideBarButton from "../components/sidebar/SideBarButton";

import { MdGamepad, MdStore, MdInfo, MdList } from "react-icons/md/index";
import { HiUsers, HiGlobe, HiCash } from "react-icons/hi/index";
import { BiLogOut } from "react-icons/bi/index";

import SideBarCard from "../components/sidebar/SideBarCard";
import IsNotLoggedIn from "../../../config/isNotLoggedIn";
import Dialog from "../../Auth/Dialog";
import Signin from "../../Auth/Signin";

import { useState } from "react";

const SideBarLayout = () => {
  const [open, setOpen] = useState(false);
  const signin = () => setOpen(true);
  return (
    <Box
      fontFamily={"quicksand"}
      fontWeight="bold"
      color={theme.highLightColor}
      maxWidth={{ lg: "240px" }}
      minWidth={{ lg: "240px" }}
      maxHeight="100%"
      minH={"90vh"}
      display={"flex"}
      flexDirection="column"
      rowGap={"1rem"}
      py="8"
    >
      <Dialog
        isOpen={open}
        close={() => setOpen(!open)}
        children={<Signin />}
      />
      <Image p={2} src={Logo}></Image>

      <SideBarCard>
        <SideBarButton title={"Games"} icon={<MdGamepad size={32} />} />
        <SideBarButton title={"Tournment"} icon={<MdList size={32} />} />
        <SideBarButton title={"Staking"} icon={<HiCash size={32} />} />
        <SideBarButton title={"Referrals"} icon={<HiUsers size={32} />} />
      </SideBarCard>

      <SideBarCard>
        <SideBarButton title={"AxleVerse"} icon={<HiGlobe size={32} />} />
        <SideBarButton title={"Marketplace"} icon={<MdStore size={32} />} />
        <SideBarButton title={"About Us"} icon={<MdInfo size={32} />} />
      </SideBarCard>

      <Flex
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
      >
        <IsNotLoggedIn>
          <Button
            _hover={{
              color: theme.bgColor,
              bg: theme.primaryColor,
            }}
            bg={theme.fgColor}
            shadow="2xl"
            transition={"all 100ms ease-in"}
            onClick={signin}
            size="lg"
            width={"80%"}
          >
            <Flex
              columnGap={".5rem"}
              alignItems={"center"}
              justifyContent="space-evenly"
            >
              <BiLogOut size={28} />
              <Text>Login</Text>
            </Flex>
          </Button>
        </IsNotLoggedIn>
      </Flex>
    </Box>
  );
};

export default SideBarLayout;
