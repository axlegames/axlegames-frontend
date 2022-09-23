import { Box, Flex, Button, Image } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import Logo from "../../../assets/home/logos/logo.png";

const SideBarLayout = () => {
  return (
    <Box
      fontFamily={"quicksand"}
      fontWeight="bold"
      color={theme.highLightColor}
      maxWidth={{ lg: "240px" }}
      minWidth={{ lg: "240px" }}
      maxHeight="90vh"
      minH={"90vh"}
      display={"flex"}
      flexDirection="column"
    >
      <Flex
        py={{ lg: "8" }}
        direction={"column"}
        justifyContent="center"
        fontSize="3xl"
      >
        <Image height={24} px={{ base: "7" }} src={Logo}></Image>
      </Flex>

      <Flex
        bg={theme.fgColor}
        my={"4"}
        mx={"4"}
        p={"4"}
        borderRadius="2xl"
        direction={"column"}
        alignItems="flex-start"
        rowGap={".5rem"}
      >
        <Button
          width={"100%"}
          variant={"ghost"}
          _hover={{ color: theme.primaryColor, bg: theme.bgColor }}
          justifyContent="flex-start"
        >
          Games
        </Button>
        <Button
          width={"100%"}
          variant={"ghost"}
          _hover={{ color: theme.primaryColor, bg: theme.bgColor }}
          justifyContent="flex-start"
        >
          Tournment
        </Button>
        <Button
          width={"100%"}
          variant={"ghost"}
          _hover={{ color: theme.primaryColor, bg: theme.bgColor }}
          justifyContent="flex-start"
        >
          Staking
        </Button>
        <Button
          width={"100%"}
          variant={"ghost"}
          _hover={{ color: theme.primaryColor, bg: theme.bgColor }}
          justifyContent="flex-start"
        >
          Referral Program
        </Button>
      </Flex>

      <Flex
        bg={theme.fgColor}
        my={"4"}
        mx={"4"}
        p={"4"}
        borderRadius="2xl"
        direction={"column"}
        alignItems="flex-start"
        justifyContent="center"
        rowGap={".5rem"}
      >
        <Button
          width={"100%"}
          variant={"ghost"}
          _hover={{ color: theme.primaryColor, bg: theme.bgColor }}
          justifyContent="flex-start"
        >
          AxleVerse
        </Button>
        <Button
          width={"100%"}
          variant={"ghost"}
          _hover={{ color: theme.primaryColor, bg: theme.bgColor }}
          justifyContent="flex-start"
        >
          Market Place
        </Button>
        <Button
          width={"100%"}
          variant={"ghost"}
          _hover={{ color: theme.primaryColor, bg: theme.bgColor }}
          justifyContent="flex-start"
        >
          About Us
        </Button>
      </Flex>
      <Flex></Flex>
    </Box>
  );
};

export default SideBarLayout;
