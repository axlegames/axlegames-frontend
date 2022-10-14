import { Button } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const FormLink = (props: any) => {
  return (
    <Button
      color={theme.primaryButtonColor}
      _active={{ color: theme.highLightColor }}
      variant={"link"}
      onClick={props.action}
    >
      {props.label}
    </Button>
  );
};

export default FormLink;
