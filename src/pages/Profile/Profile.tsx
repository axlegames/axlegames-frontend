import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  Progress,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { theme } from "../../config/theme.config";
import MainLayout from "../../layouts/MainLayout";
import Logo from "../../assets/home/logos/icon.png";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  APIHandler,
  AvtarUploadStatus,
  ProfileModel,
  ProfileService,
} from "./ProfileService";
import NeuButton from "../Axle/component/NeuButton";
import { TokenAuthStatus } from "../../config/auth";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const isAuthorized = (status: TokenAuthStatus) => {
    if (
      status.valueOf().toString() ===
      TokenAuthStatus.UNAUTHORIZED.valueOf().toString()
    ) {
      localStorage.clear();
      navigate("/");
      return window.location.reload();
    }
  };

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
        isAuthorized(res as TokenAuthStatus);
        res = res as APIHandler;
        if (!res.error) {
          return toast({
            title: "profile updated",
            description: "changes saved successfully",
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

  const [file, setFile] = useState();

  const handleAvatarUrl = async (event: any) => {
    setFile(event.target.files[0]);
    const avatarUrl = (await toBase64(event.target.files[0])) as string;
    setAvatar(avatarUrl);
  };
  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadAvatarUrl = () => {
    if (file !== null) {
      const data = new FormData();
      data.append("userId", localStorage.getItem("userId") || "");
      data.append("avatar", file || "");
      return ProfileService.setAvatarUrl(data)
        .then((res) => {
          isAuthorized(res as TokenAuthStatus);
          res = res as APIHandler;
          if (
            res.valueOf().toString() ===
            AvtarUploadStatus.UPLOADED.valueOf().toString()
          ) {
            return toast({
              title: "Success",
              description: "File Uploaded",
              status: "success",
              isClosable: true,
              duration: 5000,
              position: "top",
            });
          }

          return toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            isClosable: true,
            duration: 5000,
            position: "top",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return toast({
      title: "Upload file",
      description: "please upload file",
      status: "warning",
      isClosable: true,
      duration: 5000,
      position: "top",
    });
  };

  const [avatar, setAvatar] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    ProfileService.getProfile(localStorage.getItem("username") || "")
      .then((res) => {
        isAuthorized(res as TokenAuthStatus);
        const profile = res as ProfileModel;
        setAvatar(profile.avatarUrl);
        setProgress(profile.profileCompletetion);
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
            Update Your Profile
          </Text>
          {/* <Text color={theme.primaryTwoTextColor} fontSize={"xl"}>
            Edit your GI - Gamer Profile Details
          </Text> */}
        </Stack>

        <Box
          py={4}
          display={"grid"}
          rowGap="1rem"
          columnGap={"1rem"}
          gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        >
          <Box
            columnGap={"1rem"}
            display={"flex"}
            bg={theme.bgColor}
            p={4}
            borderRadius="xl"
            flexDirection={"column"}
            minW={{ base: "auto", lg: "24vw" }}
            alignItems={"flex-start"}
            justifyContent="center"
            rowGap={"1rem"}
          >
            <Box>
              <Text fontSize={"3xl"} color={theme.primaryTextColor}>
                Complete your profile!
              </Text>
              <Text color={theme.primaryTwoTextColor}>
                {progress.toFixed(2)}% profile has been completed
              </Text>
            </Box>
            <Box
              width={"100%"}
              boxShadow={`0px 0px 4px ${theme.primaryTextColor}`}
              borderRadius="xl"
            >
              <Progress
                borderRadius={"xl"}
                hasStripe
                width={"100%"}
                colorScheme="blue"
                height="48px"
                value={progress}
              />
            </Box>
          </Box>

          <Box
            columnGap={"1rem"}
            display={"flex"}
            bg={theme.bgColor}
            p={4}
            borderRadius="xl"
          >
            <Box display={"flex"} flexDirection="column">
              <Box bg={theme.fgColor} p={4} borderRadius="xl">
                <Image width={"32"} src={avatar || Logo} />
              </Box>
            </Box>

            <Box
              alignItems={"flex-start"}
              display="flex"
              flexDirection={"column"}
            >
              <Input
                outline="none"
                border="none"
                boxShadow={`0px 0px 3px ${theme.ternaryButtonColor}`}
                bg={theme.bgColor}
                alignItems="center"
                onChange={handleAvatarUrl}
                color={theme.secondaryTextColor}
                size="lg"
                fontWeight="bold"
                name={"avatar"}
                type={"file"}
              ></Input>
              <Box p={4}>
                <NeuButton
                  bg={"#A34400"}
                  shadow={"#FF7C1F"}
                  onClick={() => uploadAvatarUrl()}
                  label="Upload"
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "1fr 1fr",
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
        </Grid>

        <Flex p={5}>
          <NeuButton
            bg={"#A34400"}
            shadow={"#FF7C1F"}
            onClick={() => form.handleSubmit()}
            label="Update"
          />
        </Flex>
        <Divider mb={3} />
        <Flex direction={"column"}>
          <Text color={theme.primaryTextColor} fontSize="xl">
            Your Email ID
          </Text>
          <Box minWidth={"32"}>
            <Text color={theme.secondaryTextColor}>{form.values.email}</Text>
          </Box>
        </Flex>
      </Box>
    </MainLayout>
  );
};

export default Profile;
