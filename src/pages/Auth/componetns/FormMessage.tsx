import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const FormMessage = (props: any) => {
  const MessageAlert = () => (
    <Alert
      borderRadius={"lg"}
      color={theme.bgColor}
      status={props.error ? "error" : "success"}
    >
      <AlertIcon />
      {props.message}
    </Alert>
  );

  return <Box>{props.message !== "" ? <MessageAlert /> : null}</Box>;
};

export default FormMessage;
