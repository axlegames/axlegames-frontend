import { Button } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

interface FormButtonInterface {
  label: string;
  onClick: Function;
}

const FormButton = (props: FormButtonInterface) => {
  return (
    <Button
      onClick={() => props.onClick()}
      _hover={{
        color: theme.bgColor,
        bg: theme.highLightColor,
      }}
      bg={theme.bgColor}
      color={theme.primaryButtonColor}
      mx={"4"}
      width="64"
      size={"lg"}
    >
      {props.label}
    </Button>
  );
};

export default FormButton;
