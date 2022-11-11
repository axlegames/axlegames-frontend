import { Box } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";
import Signup from "./Signup";

const SignupPage = () => {
  return (
    <Box bg={theme.bgColor} py={4} px={{ base: "4", md: "20%", lg: "30%" }}>
      <Signup />
    </Box>
  );
};

export default SignupPage;
