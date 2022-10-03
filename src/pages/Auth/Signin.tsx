import { Flex, Text } from "@chakra-ui/react";
import FormField from "./componetns/FormField";
import FormButton from "./componetns/FormButton";
import FormLink from "./componetns/FormLink";
import { useNavigate } from "react-router";
import Form from "./componetns/Form";
import { useEffect, useState } from "react";
import { AuthServices } from "./AuthServices";
import { useFormik } from "formik";
import FormMessage from "./componetns/FormMessage";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

import { theme } from "../../config/theme.config";
import Dialog from "./Dialog";
import Signup from "./Signup";

const Signin = () => {
  const navigate = useNavigate();
  const clientId = `1059713289873-mnr4ecn113umdpe68k2a9but136dnde6.apps.googleusercontent.com`;

  const [status, setStatus] = useState({ message: "", error: false });
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, [clientId]);

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

  const handleLoginFailure = () => {
    setStatus({ error: true, message: "Internal Server Errror" });
  };

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

  const [open, setOpen] = useState(false);
  const signup = () => {
    setOpen(true);
  };

  return (
    <Form>
      <Dialog
        isOpen={open}
        close={() => setOpen(!open)}
        children={<Signup />}
      />
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
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={handleGoogleLogin}
          onFailure={handleLoginFailure}
          cookiePolicy={"single_host_origin"}
        />
        <FormLink action={() => signup()} label="Don't have account? Signup" />
      </Flex>
    </Form>
  );
};

export default Signin;
