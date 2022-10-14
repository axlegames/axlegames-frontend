import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

interface FormFieldInterface {
  name: string;
  label: string;
  value: string;
  onChange: any;
  type: string;
  isRequired: boolean;
  placeHolder: string;
}

const FormField = (props: FormFieldInterface) => {
  return (
    <FormControl color={theme.primaryTextColor} bg={theme.fgColor}>
      <FormLabel fontWeight="bold">
        {props.label[0].toUpperCase() + props.label.slice(1)}
      </FormLabel>
      <Input
        placeholder={props.placeHolder}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        size={"lg"}
        fontWeight="bold"
        outline={"none"}
        border="none"
        boxShadow={`0px 0px 6px ${theme.bgColor}`}
        bg={theme.bgColor}
        _focus={{ outline: "none", border: "none" }}
        type={props.type}
        isRequired={props.isRequired}
      />
    </FormControl>
  );
};

export default FormField;
