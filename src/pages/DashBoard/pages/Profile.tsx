import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";
import MainLayout from "../../../layouts/MainLayout";
import Logo from "../../../assets/home/logos/icon.png";
import { useFormik } from "formik";
import { useEffect } from "react";
import { ProfileService } from "./ProfileService";
import NeuButton from "../../Axle/component/NeuButton";

const FormInput = (props: any) => {
  return (
    <FormControl my={4}>
      <FormLabel fontWeight={"bold"} color={theme.secondaryTextColor}>
        {props.label}
      </FormLabel>
      <Input
        outline="none"
        border="none"
        boxShadow={`0px 0px 3px ${theme.ternaryButtonColor}`}
        bg={theme.fgColor}
        onChange={props.onChange}
        color={theme.secondaryTextColor}
        size="lg"
        fontWeight="bold"
        value={props.value}
        name={props.name}
        type={props.type}
        readOnly={props.readOnly ?? false}
      ></Input>
    </FormControl>
  );
};

const Profile = () => {
  const toast = useToast();

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      facebookUrl: "",
      favGames: "",
      instagramUrl: "",
      linkedInUrl: "",
      isVerified: false,
      mediumUrl: "",
      telegramUrl: "",
      twitterUrl: "",
      email: "",
      fullName: "",
      createdOn: "",
    },
    onSubmit: (values: any) => {
      ProfileService.updateProfile({
        ...values,
        userId: localStorage.getItem("userId") ?? "",
      }).then((res) => {
        console.log(res);
        if (!res.data.error) {
          return toast({
            title: "Profile Updated",
            description: "Changes saved successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }

        return toast({
          title: "Oops!",
          description: "Something went wrong",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
    },
  });

  useEffect(() => {
    ProfileService.getProfile("admin")
      .then((res) => {
        const profile = res.data;
        form.setValues({
          email: profile.email,
          facebookUrl: profile.facebookUrl,
          favGames: profile.favGames,
          instagramUrl: profile.instagramUrl,
          isVerified: profile.isVerified,
          linkedInUrl: profile.linkedInUrl,
          mediumUrl: profile.mediumUrl,
          telegramUrl: profile.telegramUrl,
          twitterUrl: profile.twitterUrl,
          username: localStorage.getItem("username") ?? "",
          fullName: profile.fullName,
          createdOn: profile.createdOn,
        });
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        <Stack my={4} textAlign={"center"}>
          <Text color={theme.primaryTextColor} fontSize={"3xl"}>
            Update Public Profile Details
          </Text>
          <Text color={theme.primaryTwoTextColor} fontSize={"xl"}>
            Edit your GI - Gamer Profile Details
          </Text>
        </Stack>

        <Grid
          templateColumns={{
            base: "1fr",
            md: "1fr 1fr",
            "2xl": "2fr 2fr 1fr",
          }}
          bg={theme.bgColor}
          borderRadius="xl"
          p={8}
          columnGap="1rem"
        >
          <Flex direction={"column"}>
            <FormInput
              name="username"
              value={form.values.username}
              onChange={form.handleChange}
              label="Username"
              type="text"
              readOnly={true}
            />
            <FormInput
              name="fullName"
              value={form.values.fullName}
              onChange={form.handleChange}
              label="Fullname"
              type="text"
            />
            <FormInput
              name="facebookUrl"
              value={form.values.facebookUrl}
              onChange={form.handleChange}
              label="Facebook"
              type="text"
            />
            <FormInput
              name="mediumUrl"
              value={form.values.mediumUrl}
              onChange={form.handleChange}
              label="Medium"
              type="text"
            />
            <FormInput
              name="instagramUrl"
              value={form.values.instagramUrl}
              onChange={form.handleChange}
              type="text"
              label="Instagram"
            />
          </Flex>

          <Flex direction={"column"}>
            <FormInput
              name="createdOn"
              value={form.values.createdOn}
              onChange={form.handleChange}
              type="text"
              label="Created On"
              readOnly={true}
            />
            <FormInput
              name="favGames"
              value={form.values.favGames}
              onChange={form.handleChange}
              type="text"
              label="Fav Games"
            />
            <FormInput
              name="twitterUrl"
              value={form.values.twitterUrl}
              onChange={form.handleChange}
              type="text"
              label="Twitter"
            />
            <FormInput
              name="telegramUrl"
              value={form.values.telegramUrl}
              onChange={form.handleChange}
              type="text"
              label="Telegram"
            />
            <FormInput
              name="linkedInUrl"
              value={form.values.linkedInUrl}
              onChange={form.handleChange}
              type="text"
              label="LinkedIn"
            />
          </Flex>
          <Box
            p={4}
            borderRadius="xl"
            display={"flex"}
            flexDirection="column"
            alignItems="center"
            rowGap={"1rem"}
          >
            <Box bg={theme.ternaryButtonColor} p={2} borderRadius="xl">
              <Text color={theme.primaryTwoTextColor}>Choose Avatar</Text>
            </Box>
            <Box bg={theme.fgColor} p={4} borderRadius="xl">
              <Image width={"32"} src={Logo} />
            </Box>
            <NeuButton
              bg={theme.ternaryButtonColor}
              onClick={() => {}}
              label="Upload"
            />
          </Box>
        </Grid>

        <Flex p={5}>
          <NeuButton
            bg={theme.ternaryButtonColor}
            onClick={() => form.handleSubmit()}
            label="Update"
          />
        </Flex>
        <Divider mb={3} />
        <Flex direction={"column"}>
          <Text color={theme.primaryTextColor} fontSize="xl">
            Your Email ID
          </Text>
          <Box maxW={"30%"} minWidth={"32"}>
            <Text color={theme.secondaryTextColor}>{form.values.email}</Text>
          </Box>
        </Flex>
      </Box>
    </MainLayout>
  );
};

export default Profile;
