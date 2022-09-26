import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const Page403 = () => {
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      minH={"100vh"}
      maxHeight="100vh"
    >
      <Text color="white" fontSize={"5xl"}>
        Error 403 Unauthorized Access
      </Text>
      <Button onClick={() => navigate("/")}>Home</Button>
    </Box>
  );
};

export default Page403;
