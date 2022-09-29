import { Box, Flex, Button, Image, Text } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import Logo from "../../../assets/home/logos/logo.png";

import { useNavigate } from "react-router";
import SideBarButton from "../components/SideBarButton";

import { MdGamepad, MdStore, MdInfo, MdList } from "react-icons/md/index";
import { HiUsers, HiGlobe, HiCash } from "react-icons/hi/index";
import { BiLogOut } from "react-icons/bi/index";

import SideBarCard from "../components/SideBarCard";

const SideBarLayout = () => {
  const navigate = useNavigate();
  const signin = () => {
    navigate("/login");
    window.location.reload();
  };
  const signout = () => {
    localStorage.clear();
    window.location.reload();
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
      <Flex direction={"column"} justifyContent="center" fontSize="3xl">
        <Image height={20} px={{ base: "12" }} src={Logo}></Image>
      </Flex>

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

      <Flex justifyContent={"center"}>
        {localStorage.getItem("userId") ? (
          <Button
            _hover={{
              color: theme.primaryColor,
              bg: theme.bgColor,
            }}
            bg={theme.primaryColor}
            shadow="2xl"
            onClick={signout}
          >
            <Flex
              columnGap={"0.5rem"}
              alignItems={"center"}
              justifyContent="space-evenly"
            >
              <BiLogOut size={28} />
              <Text>Logout</Text>
            </Flex>
          </Button>
        ) : (
          <Button
            _hover={{
              color: theme.primaryColor,
              bg: theme.bgColor,
            }}
            bg={theme.primaryColor}
            shadow="2xl"
            onClick={signin}
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
        )}
      </Flex>
    </Box>
  );
};

export default SideBarLayout;
