import {
  Box,
  Divider,
  Flex,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import { theme } from "../../config/theme.config";

// import ComingSoon from "../assets/logos/asap.png";
import Live from "../../assets/logos/live.png";
import Logo from "../../assets/home/logos/logo.png";

import SideBarButton from "./components/SideBarButton";

import { MdStore, MdInfo } from "react-icons/md/index";
import {
  HiHome,
  HiGlobe,
  HiUser,
  HiUsers,
  HiCreditCard,
} from "react-icons/hi/index";

import { BiCoin } from "react-icons/bi";

import SideBarCard from "./components/SideBarCard";
import IsNotLoggedIn from "../../config/isNotLoggedIn";
import Dialog from "../../pages/Auth/dialogs/AuthDialog";
import Signin from "../../pages/Auth/Signin";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import IsLoggedIn from "../../config/isLoggedIn";
import {
  AiOutlineDashboard,
  AiOutlineLogin,
  AiOutlineLogout,
} from "react-icons/ai";
import { useNavigate } from "react-router";

import Instagram from "../../assets/socials/instagram.png";
import Twitter from "../../assets/socials/twitter.png";
import Telegram from "../../assets/socials/telegram.png";
import Discord from "../../assets/socials/discord.png";
import Terms from "../Terms";
import HighLightButton from "./components/HighLightButton";

const images = [
  { img: Instagram, url: "https://www.instagram.com/axlegames/" },
  { img: Twitter, url: "https://twitter.com/AxleGames" },
  { img: Telegram, url: "https://t.me/axlegames_en" },
  { img: Discord, url: "https://discord.com/invite/ReHuTHVf" },
];

interface SideBarProps {
  open: boolean;
  onOpen: Function;
  onClose: Function;
  scrollTop: Function;
}

const SideBarLayout = (props: SideBarProps) => {
  const [isMobile] = useMediaQuery("(max-width: 600px)");
  const toast = useToast();
  const navigate = useNavigate();

  const signout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const [terms, setTerms] = useState(false);

  const [open, setOpen] = useState(false);

  const clearConnectionAndChangeRoute = (route: string) => {
    localStorage.removeItem("isWalletConnected");
    navigate(route);
  };

  const signin = () => {
    const address = localStorage.getItem("address");

    if (isMobile) {
      const isLoggedIn = localStorage.getItem("userId");
      if (
        !isLoggedIn ||
        isLoggedIn === null ||
        isLoggedIn === "null" ||
        isLoggedIn === "undefined"
      ) {
        return setOpen(true);
      }
    }

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

  return (
    <Box
      fontFamily={"quicksand"}
      fontWeight="bold"
      color={theme.highLightColor}
      maxWidth={{ lg: "240px" }}
      minWidth={{ lg: "240px" }}
      display={"flex"}
      flexDirection="column"
      rowGap={"1rem"}
      py="3"
    >
      <Dialog
        size="md"
        isOpen={open}
        close={() => setOpen(!open)}
        children={<Signin />}
      />
      <Dialog
        size="2xl"
        isOpen={terms}
        close={() => setTerms(!terms)}
        children={<Terms onClick={() => setTerms(!terms)} />}
      ></Dialog>
      <Image
        zIndex={100}
        cursor={"pointer"}
        onClick={() => props.scrollTop()}
        width={"48"}
        src={Logo}
        alignSelf="center"
      ></Image>

      <SideBarCard>
        <SideBarButton
          onClick={() => clearConnectionAndChangeRoute("/")}
          link={"/"}
          title={"Home"}
          icon={<HiHome size={32} />}
        />
        <IsLoggedIn>
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
            onClick={() => clearConnectionAndChangeRoute("/leaderboard")}
            link={"/leaderboard"}
            title={"Leaderboard"}
            icon={<MdStore size={32} />}
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

        {/* <Accordion width={"100%"} allowToggle defaultIndex={0}>
          <AccordionItem border={"none"} outline="none" width={"100%"}>
            <AccordionButton
              borderRadius={"md"}
              width={"100%"}
              justifyContent="flex-start"
              bg={theme.bgColor}
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
        </Accordion> */}
      </SideBarCard>

      <IsNotLoggedIn>
        <HighLightButton
          title="Join DApp"
          icon={AiOutlineLogin}
          click={() => signin()}
        />
      </IsNotLoggedIn>
      <IsLoggedIn>
        <HighLightButton
          icon={AiOutlineLogout}
          title="Logout"
          click={signout}
        />
      </IsLoggedIn>
      <Box p={2} borderRadius="lg">
        <Text opacity={"0.5"} fontSize={"sm"}>
          Join Community
        </Text>

        <Divider my={1} />
        <Flex my={2} color={theme.primaryButtonColor} columnGap={".5rem"}>
          {images.map((p, i) => (
            <a key={i} target="_blank" rel="noopener noreferrer" href={p.url}>
              <Image
                width={"8"}
                src={p.img}
                key={i}
                style={{ cursor: "pointer" }}
              />
            </a>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default SideBarLayout;
