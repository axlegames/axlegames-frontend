import { Box, Text } from "@chakra-ui/react";

interface FormErrorInterface {
  touched: boolean;
  name: string;
}

const FormError = (props: FormErrorInterface) => {
  return (
    <Box>
      {props.touched || props.name ? (
        <Text fontSize={"smaller"} color="red.600">
          {" "}
          {props.name}{" "}
        </Text>
      ) : null}
    </Box>
  );
};

export default FormError;
