import { Box, Flex, Image, Text } from "@chakra-ui/react";
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

interface SideBarProps {
  open: boolean;
  onOpen: Function;
  onClose: Function;
}

const SideBarLayout = (props: SideBarProps) => {
  const [open, setOpen] = useState(false);
  const signin = () => {
    if (localStorage.getItem("address")) return setOpen(true);
    return props.onOpen();
  };
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
        size="md"
        isOpen={open}
        close={() => setOpen(!open)}
        children={<Signin />}
      />
      <Image p={2} src={Logo}></Image>

      <SideBarCard>
        <SideBarButton title={"Games"} icon={<MdGamepad size={32} />} />
        <SideBarButton title={"Tournment"} icon={<MdList size={32} />} />
        <SideBarButton title={"Rewards"} icon={<HiCash size={32} />} />
        <SideBarButton title={"Referrals"} icon={<HiUsers size={32} />} />
      </SideBarCard>

      <SideBarCard>
        <SideBarButton title={"AxleVerse"} icon={<HiGlobe size={32} />} />
        <SideBarButton title={"Marketplace"} icon={<MdStore size={32} />} />
        <SideBarButton title={"About Us"} icon={<MdInfo size={32} />} />
      </SideBarCard>

      <IsNotLoggedIn>
        <Box
          alignSelf={"center"}
          display={"flex"}
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          bg={theme.primaryColor}
          color={theme.bgColor}
          boxShadow={`0px 0px 16px ${theme.primaryColor}`}
          transition={"all 100ms ease-in"}
          onClick={signin}
          maxWidth={{ lg: "240px" }}
          minWidth={{ lg: "240px" }}
          height={"12"}
          borderRadius="xl"
          _hover={{
            boxShadow: `0px 0px 0px ${theme.bgColor}`,
          }}
        >
          <Flex
            columnGap={"1rem"}
            alignItems={"center"}
            justifyContent="flex-start"
            width={"100%"}
            px={4}
          >
            <Flex alignItems={"center"} px={4} columnGap={"1rem"}>
              <BiLogOut size={32} />
              <Text fontSize={"20"}>Login</Text>
            </Flex>
          </Flex>
        </Box>
      </IsNotLoggedIn>
    </Box>
  );
};

export default SideBarLayout;
