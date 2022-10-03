import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { BiCog, BiLogOut, BiUser } from "react-icons/bi";
import { theme } from "../../../../config/theme.config";

const UserDropDown = (props: any) => {
  const signout = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (props.openDropDown)
    return (
      <Box
        zIndex={200}
        display={"flex"}
        flexDirection="column"
        onMouseEnter={() => props.setOpenDropDown(true)}
        onMouseLeave={() => props.setOpenDropDown(false)}
        px={4}
        py={4}
        borderRadius={"lg"}
        bg={theme.primaryColor}
        position={"absolute"}
        bottom="-300%"
        rowGap={".5rem"}
        maxWidth={"200px"}
      >
        <Text fontFamily={"quicksand"}>
          Welcome, {localStorage.getItem("username")}
        </Text>

        <Button
          _hover={{
            color: theme.primaryColor,
            bg: theme.bgColor,
          }}
          bg={theme.primaryColor}
          shadow="2xl"
          onClick={props.signout}
          justifyContent="flex-start"
        >
          <Flex columnGap={"0.5rem"} alignItems={"center"}>
            <BiUser size={28} />
            <Text>Profile</Text>
          </Flex>
        </Button>
        <Button
          _hover={{
            color: theme.primaryColor,
            bg: theme.bgColor,
          }}
          bg={theme.primaryColor}
          shadow="2xl"
          justifyContent="flex-start"
        >
          <Flex columnGap={"0.5rem"} alignItems={"center"}>
            <BiCog size={28} />
            <Text>Settings</Text>
          </Flex>
        </Button>

        <Button
          _hover={{
            color: theme.primaryColor,
            bg: theme.bgColor,
          }}
          bg={theme.primaryColor}
          shadow="2xl"
          onClick={signout}
          justifyContent="flex-start"
        >
          <Flex columnGap={"0.5rem"} alignItems={"center"}>
            <BiLogOut size={28} />
            <Text>Logout</Text>
          </Flex>
        </Button>
      </Box>
    );
  return null;
};

export default UserDropDown;
