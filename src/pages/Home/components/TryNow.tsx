import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { theme } from "../../../config/theme.config";
import { GameServices } from "../../Games/GameServices";

const TryNow = (props: {
  name: string;
  contestId: string;
  link: string;
  close: Function;
  isOpen: boolean;
}) => {
  const navigate = useNavigate();
  const form = useFormik({
    initialValues: { guest: "" },
    onSubmit: (values) => {
      const r = {
        ...values,
        contestId: props.contestId,
      };
      GameServices.createGuestGameState(r)
        .then((res: any) => {
          localStorage.setItem("guestname", values.guest);
          if (res.status === "OK") {
            let l = "";
            if (props.link.includes("aiwordle")) l = "aiwordle";
            navigate(
              `${l}/guest/${props.link}/${props.contestId}/${res.gameState._id}`
            );
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <Modal
      isCentered={true}
      isOpen={props.isOpen}
      onClose={() => props.close()}
    >
      <ModalOverlay backdropFilter="blur(4px) hue-rotate(0deg)" />
      <ModalContent
        p={4}
        borderRadius={"xl"}
        color="#fbd6d2"
        fontFamily={"quicksand"}
        fontWeight="bold"
        bg={theme.modalBgColor}
      >
        <Box p={4} display={"flex"} flexDirection="column" rowGap={"1rem"}>
          <Text
            textAlign={"center"}
            fontSize={"3xl"}
            color={theme.primaryTextColor}
          >
            {props.name} Practice Game
          </Text>
          <FormControl fontWeight={"bold"} color={theme.primaryTextColor}>
            <FormLabel fontWeight={"bold"}>Enter name</FormLabel>
            <Input
              placeholder={"Guest"}
              id={"guest"}
              name="guest"
              value={form.values.guest}
              onChange={form.handleChange}
              size={"lg"}
              autoComplete="off"
              fontWeight="bold"
              border={"none"}
              outline="none"
              bg={theme.modalBgColor}
              color={theme.secondaryTextColor}
              boxShadow={`inset 5px 5px 15px #1e1c33, inset -5px -5px 15px #2e2c51`}
              _focus={{ outline: "none", border: "none" }}
              type={"text"}
              isRequired={true}
              _hover={{
                outline: "none",
                border: "none",
              }}
              _highlighted={{
                outline: "none",
                border: "none",
              }}
              _focusVisible={{
                outline: "none",
                border: "none",
              }}
            />
          </FormControl>
          <Box display={"flex"} alignItems="center">
            <Button
              color={theme.primaryButtonColor}
              boxShadow={`5px 5px 15px #1e1c33, -5px -5px 15px #2e2c51`}
              _active={{
                bg: theme.primaryButtonColor,
                color: theme.modalBgColor,
              }}
              _hover={{
                bg: theme.primaryButtonColor,
                color: theme.modalBgColor,
              }}
              bg={theme.modalBgColor}
              onClick={() => form.handleSubmit()}
            >
              Play
            </Button>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default TryNow;
