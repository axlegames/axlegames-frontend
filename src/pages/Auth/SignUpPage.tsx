import { Box, Image } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";
import Signup from "./Signup";
import Logo from "../../assets/home/logos/logo.png";

const SignupPage = () => {
  return (
    <Box
      flexDirection={"column"}
      alignItems="center"
      justifyContent={"center"}
      bg={theme.bgColor}
      rowGap="1rem"
      display="flex"
      py={8}
    >
      <Image height={"32"} src={Logo} />
      <Box minW="22vw">
        <Signup />
      </Box>
    </Box>
  );
};

export default SignupPage;
