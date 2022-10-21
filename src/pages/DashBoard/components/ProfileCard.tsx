import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { theme } from "../../../config/theme.config";
import Logo from "../../../assets/home/logos/icon.png";

const ProfileCard = () => {
  const navigate = useNavigate();

  return (
    <Flex
      justifyContent={"center"}
      bg={theme.bgColor}
      alignItems="center"
      py={"8"}
      px={"4"}
      shadow="xl"
      borderRadius={"xl"}
      columnGap="1rem"
      direction={"column"}
      fontWeight="bold"
      rowGap={".5rem"}
    >
      <Image
        bg={theme.fgColor}
        p={4}
        borderRadius="8vw"
        maxW={"32"}
        src={Logo}
      />
      <Text color={theme.primaryTwoTextColor}>
        ({localStorage.getItem("username")})
      </Text>
      <Flex justifyContent={"center"} columnGap=".5rem">
        <Button
          color={theme.secondaryTwoTextColor}
          bg={theme.ternaryButtonColor}
        >
          Copy Link
        </Button>
        <Button
          bg={theme.secondaryButtonColor}
          onClick={() => navigate("/profile")}
        >
          View Profile
        </Button>
      </Flex>
    </Flex>
  );
};

export default ProfileCard;
