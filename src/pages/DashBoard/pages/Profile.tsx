import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import MainLayout from "../../../layouts/MainLayout";
import Logo from "../../../assets/home/logos/icon.png";

const FormInput = (props: any) => {
  return (
    <FormControl my={4}>
      <FormLabel color={theme.primaryTextColor}>{props.label}</FormLabel>
      <Input
        outline="none"
        border="none"
        boxShadow={`0px 0px 3px ${theme.primaryColor}`}
        bg={theme.fgColor}
        size="lg"
        color={theme.secondaryColor}
      ></Input>
    </FormControl>
  );
};

const Profile = () => {
  return (
    <MainLayout>
      <Box
        fontFamily={"quicksand"}
        bg={theme.fgColor}
        fontWeight="bold"
        p={4}
        borderRadius="2xl"
        m={4}
      >
        <Stack textAlign={"center"}>
          <Text color={theme.primaryTextColor} fontSize={"2xl"}>
            Update Public Profile Details
          </Text>
          <Text color={theme.secondaryTextColor} fontSize={"md"}>
            Edit your GI - Gamer Profile Details
          </Text>
        </Stack>

        <Text color={theme.primaryTextColor} fontSize="xl" p={2}>
          Update Personal Details
        </Text>

        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr", "2xl": "2fr 2fr 1fr" }}
          bg={theme.bgColor}
          borderRadius="xl"
          p={8}
          columnGap="1rem"
        >
          <Flex direction={"column"}>
            <FormInput label="Username" />
            <FormInput label="Fullname" />
            <FormInput label="Facebook" />
            <FormInput label="Medium" />
            <FormInput label="Instagram" />
          </Flex>

          <Flex direction={"column"}>
            <FormInput label="Registered On" />
            <FormInput label="Fav Games" />
            <FormInput label="Twitter" />
            <FormInput label="Telegram" />
            <FormInput label="LinkedIn" />
          </Flex>
          <Box
            p={4}
            borderRadius="xl"
            display={"flex"}
            flexDirection="column"
            alignItems="center"
            rowGap={"1rem"}
          >
            <Box bg={theme.primaryColor} p={2} borderRadius="xl">
              <Text>Choose Avatar</Text>
            </Box>
            <Box bg={theme.fgColor} p={4} borderRadius="xl">
              <Image width={"32"} src={Logo} />
            </Box>
            <Button>Upload</Button>
          </Box>
        </Grid>

        <Flex p={5}>
          <Button>Update</Button>
        </Flex>
        <Divider my={4} />
        <Flex direction={"column"}>
          <Text color={theme.primaryTextColor} fontSize="xl">
            Your Email ID
          </Text>
          <Box maxW={"30%"} minWidth={"32"}>
            <Text color={theme.secondaryTextColor}>
              axlegames@axlegames.com
            </Text>
          </Box>
        </Flex>
      </Box>
    </MainLayout>
  );
};

export default Profile;
