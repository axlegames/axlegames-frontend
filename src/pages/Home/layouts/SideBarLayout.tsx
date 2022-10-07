import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import Logo from "../../../assets/home/logos/logo.png";

import SideBarButton from "../components/sidebar/SideBarButton";

import { MdGamepad, MdStore, MdInfo, MdList } from "react-icons/md/index";
import { HiUsers, HiGlobe, HiCash } from "react-icons/hi/index";

import SideBarCard from "../components/sidebar/SideBarCard";
import IsNotLoggedIn from "../../../config/isNotLoggedIn";
import Dialog from "../../Auth/dialogs/Dialog";
import Signin from "../../Auth/Signin";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import IsLoggedIn from "../../../config/isLoggedIn";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

interface SideBarProps {
  open: boolean;
  onOpen: Function;
  onClose: Function;
  scrollTop: Function;
}

const SideBarLayout = (props: SideBarProps) => {
  const toast = useToast();

  const signout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const [open, setOpen] = useState(false);

  const signin = () => {
    const address = localStorage.getItem("address");
    if (
      !address ||
      address === null ||
      address === "null" ||
      address === "undefined"
    )
      return toast({
        title: "Connect Wallet",
        description: "Please connect your wallet before login",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

    return setOpen(true);
  };

  const HighLightButton = (props: any) => {
    return (
      <Box
        alignSelf={"center"}
        display={"flex"}
        alignItems="center"
        justifyContent={"center"}
        bg={theme.primaryColor}
        color={theme.bgColor}
        boxShadow={`0px 0px 8px ${theme.primaryColor}`}
        transition={"all 100ms ease-in"}
        onClick={props.click}
        maxWidth={{ lg: "240px" }}
        minWidth={{ lg: "240px" }}
        height={"12"}
        borderRadius="xl"
        cursor={"pointer"}
        _hover={{
          boxShadow: `0px 0px 0px ${theme.bgColor}`,
        }}
      >
        <Flex
          justifyContent={"space-evenly"}
          columnGap=".4rem"
          alignItems="center"
        >
          <props.icon size={32} color={theme.bgColor}></props.icon>
          <Text fontSize={"20"}>{props.title}</Text>
        </Flex>
      </Box>
    );
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

      <Image
        zIndex={30000}
        cursor={"pointer"}
        onClick={() => props.scrollTop()}
        p={2}
        src={Logo}
      ></Image>

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
        <HighLightButton
          icon={AiOutlineLogin}
          title="Join DApp"
          click={signin}
        />
      </IsNotLoggedIn>
      <IsLoggedIn>
        <HighLightButton
          icon={AiOutlineLogout}
          title="Logout"
          click={signout}
        />
      </IsLoggedIn>
    </Box>
  );
};

export default SideBarLayout;
