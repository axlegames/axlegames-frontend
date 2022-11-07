import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Flex,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { theme } from "../config/theme.config";
import Logo from "../assets/home/logos/logo.png";

import SideBarButton from "../pages/Home/components/sidebar/SideBarButton";

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

import { BiCoin } from "react-icons/bi";

import SideBarCard from "../pages/Home/components/sidebar/SideBarCard";
import IsNotLoggedIn from "../config/isNotLoggedIn";
import Dialog from "../pages/Auth/dialogs/Dialog";
import Signin from "../pages/Auth/Signin";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import IsLoggedIn from "../config/isLoggedIn";
import {
  AiOutlineDashboard,
  AiOutlineLogin,
  AiOutlineLogout,
} from "react-icons/ai";
import { useNavigate } from "react-router";

import Instagram from "../assets/socials/instagram.png";
import Twitter from "../assets/socials/twitter.png";
import Telegram from "../assets/socials/telegram.png";
import Discord from "../assets/socials/discord.png";

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

  const HighLightButton = (props: any) => {
    return (
      <Box
        alignSelf={"center"}
        display={"flex"}
        alignItems="center"
        justifyContent={"center"}
        bg={theme.primaryButtonColor}
        color={theme.bgColor}
        boxShadow={`0px 0px 8px ${theme.primaryButtonColor}`}
        transition={"all 100ms ease-in"}
        onClick={props.click}
        maxWidth={{ lg: "236px" }}
        minWidth={{ lg: "236px" }}
        height={{ base: "12" }}
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
      minH={"100vh"}
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

      <Image
        zIndex={23600}
        cursor={"pointer"}
        onClick={() => props.scrollTop()}
        px={{ base: "8" }}
        py={4}
        src={Logo}
      ></Image>

      <IsLoggedIn>
        <SideBarCard>
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
            onClick={() => clearConnectionAndChangeRoute("/my-rewards")}
            link={"/my-rewards"}
            title={"My Reward"}
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
        </SideBarCard>
      </IsLoggedIn>

      <SideBarCard>
        <IsNotLoggedIn>
          <SideBarButton
            onClick={() => clearConnectionAndChangeRoute("/")}
            link={"/"}
            title={"Home"}
            icon={<HiHome size={32} />}
          />
        </IsNotLoggedIn>

        <SideBarButton
          onClick={() => clearConnectionAndChangeRoute("/axle-token")}
          title={"AXLE Token"}
          link="/axle-token"
          icon={<BiCoin size={32} />}
        />
        <SideBarButton
          isCommingSoon={true}
          title={"AxleVerse"}
          icon={<HiGlobe size={32} />}
        />
        <SideBarButton title={"Marketplace"} icon={<MdStore size={32} />} />

        <SideBarButton title={"About Us"} icon={<MdInfo size={32} />} />

        <Accordion width={"100%"} allowToggle allowMultiple>
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
