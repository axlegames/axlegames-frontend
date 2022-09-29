import { Flex, Text } from "@chakra-ui/react";
import FormField from "./componetns/FormField";
import FormButton from "./componetns/FormButton";
import FormLink from "./componetns/FormLink";
import { useNavigate } from "react-router";
import Form from "./componetns/Form";
import { useState } from "react";
import { AuthServices } from "./AuthServices";
import { useFormik } from "formik";
import FormMessage from "./componetns/FormMessage";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import { theme } from "../../config/theme.config";

const Signin = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState({ message: "", error: false });

  const handleLoginSuccess = (data: any) => {
    AuthServices.createSession(data);
    if (data.error) setStatus({ error: data.error, message: data.message });
    else {
      AuthServices.createSession(data);
      navigate("/");
    }
    setTimeout(() => {
      setStatus({ error: false, message: "" });
    }, 5000);
  };

  const handleLoginFailure = () =>
    setStatus({ error: true, message: "Internal Server Errror" });

  const form = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: (values: any) => {
      AuthServices.login(values)
        .then((res: any) => handleLoginSuccess(res.data))
        .catch((err: any) => {
          console.log(err);
          handleLoginFailure();
        });
    },
  });

  const handleGoogleLogin = (data: any) => {
    const tokenData = { token: data.tokenId };
    AuthServices.loginGoogle(tokenData)
      .then((res: any) => {
        console.log(res.data);
        setStatus({ error: res.data.error, message: res.data.message });
        if (!res.data.error) {
          AuthServices.createSession(res.data);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      setStatus({
        error: false,
        message: "",
      });
    }, 5000);
  };

  return (
    <Form>
      <Text color={theme.primaryColor} fontSize={{ base: "4xl" }}>
        Login
      </Text>
      <FormMessage message={status.message} error={status.error} />
      <FormField
        name="username"
        placeHolder="Username / email"
        value={form.values.username}
        onChange={form.handleChange}
        label="email"
        type="email"
        isRequired={true}
      />
      <FormField
        name="password"
        placeHolder="Password"
        value={form.values.password}
        onChange={form.handleChange}
        label="password"
        type="password"
        isRequired={true}
      />
      <Flex py={{ base: "2" }} justifyContent={"flex-end"}>
        <FormLink
          action={() => navigate("/forgot-password")}
          label="Forgot Password?"
        />
      </Flex>
      <Flex
        rowGap={"1rem"}
        direction={"column"}
        alignItems="center"
        justifyContent={"center"}
      >
        <FormButton onClick={() => form.handleSubmit()} label="Sign in" />
        <Text fontWeight={"bolder"}>OR</Text>
        <GoogleOAuthProvider clientId="1059713289873-mnr4ecn113umdpe68k2a9but136dnde6.apps.googleusercontent.com">
          <GoogleLogin onError={() => {}} onSuccess={handleGoogleLogin} />
        </GoogleOAuthProvider>
        <FormLink
          action={() => navigate("/signup")}
          label="Don't have account? Signup"
        />
      </Flex>
    </Form>
  );
};

export default Signin;
