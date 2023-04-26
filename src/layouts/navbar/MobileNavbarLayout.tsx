import {
  Box,
  Flex,
  Image,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { theme } from "../../config/theme.config";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineDashboard,
  AiOutlineLogin,
  AiOutlineLogout,
} from "react-icons/ai/index";
import { useState } from "react";
import Logo from "../../assets/home/logos/logo.png";
import IsLoggedIn from "../../config/isLoggedIn";
import SideBarCard from "./components/SideBarCard";
import SideBarButton from "./components/SideBarButton";
import { useNavigate } from "react-router";
import { MdStore, MdInfo } from "react-icons/md/index";
import {
  HiHome,
  HiGlobe,
  HiOutlineViewList,
  HiDocument,
  HiUser,
  HiUsers,
  HiCreditCard,
} from "react-icons/hi/index";
import IsNotLoggedIn from "../../config/isNotLoggedIn";
import { BiCoin } from "react-icons/bi";
import Dialog from "../../pages/Auth/dialogs/AuthDialog";
import Terms from "../Terms";

import Live from "../../assets/logos/live.png";
import HighLightButton from "./components/HighLightButton";
import Signin from "../../pages/Auth/Signin";

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [terms, setTerms] = useState(false);

  const navigate = useNavigate();
  const clearConnectionAndChangeRoute = (route: string) => {
    localStorage.removeItem("isWalletConnected");
    navigate(route);
  };

  const [isMobile] = useMediaQuery("(max-width: 900px)");
  const toast = useToast();

  const signin = () => {
    // const address = localStorage.getItem("address");
    if (isMobile) {
      const isLoggedIn = localStorage.getItem("userId");
      if (
        !isLoggedIn ||
        isLoggedIn === null ||
        isLoggedIn === "null" ||
        isLoggedIn === "undefined"
      ) {
        return setLogin(true);
      }
    }

    // if (
    //   !address ||
    //   address === null ||
    //   address === "null" ||
    //   address === "undefined"
    // )
    //   return toast({
    //     title: "Connect Wallet",
    //     description: "Please connect your wallet before login",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "top",
    //   });
    const isLoggedIn = localStorage.getItem("userId");
    if (
      !isLoggedIn ||
      isLoggedIn === null ||
      isLoggedIn === "null" ||
      isLoggedIn === "undefined"
    ) {
      return setOpen(true);
    }
    // redirect to profile once it was completed
    return toast({
      title: "Profile Page",
      description: "Inprogress",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const signout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Box
      width={"100%"}
      display={{ base: "flex", lg: "none" }}
      flexDirection="column"
      fontFamily={"quicksand"}
      boxShadow={`0px 2px 3px ${theme.fgColor}`}
    >
      <Dialog
        size="md"
        isOpen={login}
        close={() => setLogin(!login)}
        children={<Signin />}
      />
      <Dialog
        size="2xl"
        isOpen={terms}
        close={() => setTerms(!terms)}
        children={<Terms onClick={() => setTerms(!terms)} />}
      ></Dialog>
      <Box
        display={"flex"}
        color={theme.highLightColor}
        fontWeight="bold"
        fontSize={"3xl"}
        width="100%"
        justifyContent={"space-between"}
        px={{ base: "8" }}
        py={{ base: "4" }}
        alignItems={"center"}
        position="relative"
      >
        <Flex alignItems={"center"} columnGap=".5rem">
          <Image maxH={"6vh"} src={Logo}></Image>
        </Flex>
        <Box
          onClick={() => setOpen(!open)}
          _hover={{
            transform: "scale(1.05)",
            transition: "200ms all ease-in",
          }}
        >
          {open ? (
            <AiOutlineClose
              style={{
                transform: "scale(1.05)",
                transition: "100ms all ease-in",
              }}
              color={theme.highLightColor}
              size={32}
            />
          ) : (
            <AiOutlineMenu
              style={{
                transform: "scale(1.05)",
                transition: "100ms all ease-in",
              }}
              color={theme.highLightColor}
              size={32}
            />
          )}
        </Box>
      </Box>

      <Box height={open ? "100vh" : "0"} position={"relative"}>
        <Box
          zIndex={100}
          transition={"all ease 500ms"}
          opacity={open ? 1 : 0}
          fontFamily={"quicksand"}
          fontWeight="bold"
          color={theme.highLightColor}
          visibility={open ? "visible" : "hidden"}
          width="100%"
          boxShadow="lg"
          position={"absolute"}
        >
          <SideBarCard>
            <IsLoggedIn>
              <SideBarButton
                onClick={() => clearConnectionAndChangeRoute("/")}
                link={"/"}
                title={"Home"}
                icon={<HiHome size={32} />}
              />
              <SideBarButton
                onClick={() => clearConnectionAndChangeRoute("/dashboard")}
                link="/dashboard"
                title={"Dashboard"}
                icon={<AiOutlineDashboard size={32} />}
              />
              <SideBarButton
                onClick={() => clearConnectionAndChangeRoute("/wallet")}
                link={"/wallet"}
                title={"Wallet"}
                icon={<HiCreditCard size={32} />}
              />
              <SideBarButton
                onClick={() => clearConnectionAndChangeRoute("/referrals")}
                link={"/referral"}
                title={"Referral"}
                icon={<HiUsers size={32} />}
              />

              <SideBarButton
                onClick={() => clearConnectionAndChangeRoute("/profile")}
                link={"/profile"}
                title={"Profile"}
                icon={<HiUser size={32} />}
              />
            </IsLoggedIn>

            <IsNotLoggedIn>
              <SideBarButton
                onClick={() => clearConnectionAndChangeRoute("/")}
                link={"/"}
                title={"Home"}
                icon={<HiHome size={32} />}
              />
            </IsNotLoggedIn>

            <Box width={"100%"} position="relative">
              <Image
                position={"absolute"}
                zIndex={100}
                right="5%"
                top={"-12%"}
                src={Live}
                height="12"
                width={"12"}
              />
              <SideBarButton
                onClick={() => clearConnectionAndChangeRoute("/axle-token")}
                title={"AXLE Token"}
                link="/axle-token"
                icon={<BiCoin size={32} />}
              />
            </Box>
            <SideBarButton
              isCommingSoon={true}
              onClick={() => clearConnectionAndChangeRoute("/coming-soon")}
              title={"AxleVerse"}
              icon={<HiGlobe size={32} />}
            />

            <SideBarButton
              onClick={() => clearConnectionAndChangeRoute("/coming-soon")}
              title={"Marketplace"}
              icon={<MdStore size={32} />}
            />
            <SideBarButton
              onClick={() => setTerms(true)}
              title={"Terms & Conditions"}
              icon={<MdInfo size={32} />}
            />

            <Accordion width={"100%"} allowToggle defaultIndex={0}>
              <AccordionItem border={"none"} outline="none" width={"100%"}>
                <AccordionButton
                  borderRadius={"md"}
                  width={"100%"}
                  justifyContent="flex-start"
                  _hover={{ color: theme.primaryTextColor, bg: theme.bgColor }}
                  position="relative"
                  fontSize={"sm"}
                  fontWeight="bold"
                >
                  <Flex
                    alignItems={"center"}
                    justifyContent="space-between"
                    width={"100%"}
                    columnGap={"1rem"}
                  >
                    <Flex alignItems={"center"} columnGap={"1rem"}>
                      <Box>
                        <HiOutlineViewList size={32} />
                      </Box>
                      <Text>{`Docs`}</Text>
                    </Flex>
                    <AccordionIcon />
                  </Flex>
                </AccordionButton>
                <AccordionPanel>
                  <Flex direction={"column"} rowGap=".25rem">
                    <a
                      href="https://axlegames.s3.ap-south-1.amazonaws.com/Axlegames.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ width: "100%" }}
                    >
                      {" "}
                      <SideBarButton
                        title={"Pitch-Deck"}
                        icon={<HiDocument size={32} />}
                      />
                    </a>
                    <a
                      href="https://axlegames.s3.ap-south-1.amazonaws.com/AxleGames_EconomicsPaper.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ width: "100%" }}
                    >
                      {" "}
                      <SideBarButton
                        title={"Economics-Paper"}
                        icon={<HiDocument size={32} />}
                      />
                    </a>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </SideBarCard>
          <Box p={open ? 4 : 0}>
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
        </Box>
      </Box>
    </Box>
  );
};

export default MobileNavbar;
