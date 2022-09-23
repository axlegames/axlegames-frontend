import { Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import Form from "./componetns/Form";
import FormButton from "./componetns/FormButton";
import FormField from "./componetns/FormField";
import FormLink from "./componetns/FormLink";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <Form>
      <Text fontSize={{ base: "4xl" }}>Forgot Password</Text>
      <FormField
        placeHolder="Email/Username"
        value=""
        name="username"
        onChange={() => {}}
        label="username/email"
        type="text"
        isRequired={true}
      />
      <Flex
        rowGap={"1rem"}
        direction={"column"}
        alignItems="center"
        justifyContent={"center"}
      >
        <FormButton onClick={() => null} label="Send password reset link" />
        <FormLink
          action={() => navigate("/signin")}
          label="Already have an account? Sign in"
        />
      </Flex>
    </Form>
  );
};

export default ForgotPassword;
