import { Box, Flex, Text } from "@chakra-ui/react";
import Form from "./componetns/Form";
import FormButton from "./componetns/FormButton";
import FormField from "./componetns/FormField";
import FormLink from "./componetns/FormLink";
import FormMessage from "./componetns/FormMessage";

import { useFormik } from "formik";
import { AuthServices } from "./AuthServices";
import { useEffect, useState } from "react";
import FormError from "./componetns/FormError";
import { theme } from "../../config/theme.config";
import { useParams } from "react-router";
import { ReferralModel, ReferralServices } from "../Referral/ReferralServices";

const isValidUsername = (username: string) => /^[a-z0-9]{6}$/.test(username);
const isValidEmail = (email: string) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
const toLowerCase = (text: string) => String(text).toLowerCase();
const validate = (values: any) => {
  const errors: any = {};
  if (!values.name) errors.name = "*required";
  if (!values.username) errors.username = "*required";
  else if (isValidUsername(toLowerCase(values.username)))
    errors.username = "*username should be alpha numeric";
  else if (values.username.length < 7) errors.username = "*min 6 characters";
  if (!values.email) errors.email = "*requried";
  else if (!isValidEmail(toLowerCase(values.email)))
    errors.email = "*invalid email";
  if (!values.password) errors.password = "*requried";
  if (values.password.length < 7) errors.password = "*min 8 characters";
  if (!values.confirmPassword) errors.confirmPassword = "*requried";
  else if (values.confirmPassword !== values.password)
    errors.confirmPassword = "*password and confirm password are not same";
  return errors;
};

const Signup = (props: any) => {
  const params = useParams();

  const handleRequest = (data: any) => {
    console.log(data);
    setStatus({
      error: data.error,
      message: data.message,
      errorType: data.errorType,
    });
    if (!data.error) {
      form.resetForm();
      setTimeout(() => {}, 3500);
    }
  };

  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
      referralCode: params.id || "",
    },
    validate,
    onSubmit: (values) => {
      AuthServices.register(values)
        .then((res) => handleRequest(res.data))
        .catch((err) =>
          setStatus({
            error: true,
            message: "Internal Server Errror",
            errorType: "INTERNAL_SERVER_ERROR",
          })
        );
    },
  });

  useEffect(() => {
    ReferralServices.getReferralAndReferralCode(params.id)
      .then((res) => {
        setReferral(res as ReferralModel);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [referral, setReferral] = useState<ReferralModel>({
    referralCode: "",
    referrals: [],
    username: "",
  });

  const [status, setStatus] = useState({
    message: "",
    errorType: "",
    error: false,
  });

  return (
    <Form>
      <FormMessage message={status.message} error={status.error} />
      <Text color={theme.primaryTextColor} fontSize={{ base: "4xl" }}>
        Sign Up
      </Text>
      <FormField
        placeHolder="Name"
        value={form.values.name}
        onChange={form.handleChange}
        name="name"
        label="name"
        type="text"
        isRequired={true}
      />
      <FormError
        touched={form.touched.name ?? false}
        name={form.errors.name ?? ""}
      />
      <FormField
        placeHolder="Username"
        value={form.values.username}
        onChange={form.handleChange}
        name="username"
        label="username"
        type="text"
        isRequired={true}
      />
      <FormError
        touched={form.touched.username ?? false}
        name={form.errors.username ?? ""}
      />
      <FormField
        placeHolder="Email"
        value={form.values.email}
        onChange={form.handleChange}
        name="email"
        label="email"
        type="email"
        isRequired={true}
      />
      <FormError
        touched={form.touched.email ?? false}
        name={form.errors.email ?? ""}
      />
      <FormField
        placeHolder="Password"
        value={form.values.password}
        onChange={form.handleChange}
        name="password"
        label="password"
        type="password"
        isRequired={true}
      />
      <FormError
        touched={form.touched.password ?? false}
        name={form.errors.password ?? ""}
      />
      <FormField
        placeHolder="Confirm Password"
        value={form.values.confirmPassword}
        onChange={form.handleChange}
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        isRequired={true}
      />
      <FormError
        touched={form.touched.confirmPassword ?? false}
        name={form.errors.confirmPassword ?? ""}
      />
      {!params.id ? (
        <FormField
          placeHolder="Referral Code"
          value={form.values.referralCode}
          onChange={form.handleChange}
          name="referralCode"
          label="Referral Code"
          type="text"
          isRequired={false}
        />
      ) : null}
      <Flex
        rowGap={"1rem"}
        direction={"column"}
        alignItems="center"
        justifyContent={"center"}
      >
        <FormButton onClick={() => form.handleSubmit()} label="Sign up" />

        {params.id ? (
          <Box textAlign={"center"}>
            <Text>Using referral code {referral.username}</Text>
            <Text>Referrer will be rewarded with 500 AXLE</Text>
          </Box>
        ) : (
          <FormLink
            action={() => props.close()}
            label="Already have an account? Sign in"
          />
        )}
      </Flex>
    </Form>
  );
};

export default Signup;
