import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import moment from "moment";
import { theme } from "../../../config/theme.config";
import { Challenge } from "../ChallengerServices";

const Tag = (props: { name: string; value: string | number | boolean }) => {
  return (
    <Box>
      <Flex
        fontFamily={"'Russo One', sans-serif"}
        columnGap={"1rem"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Box color={theme.secondaryTextColor}>{props.name}</Box>
        <Box
          p={2}
          px={4}
          borderRadius={"md"}
          bg={theme.fgColor}
          color={theme.primaryTextColor}
          textAlign="right"
          fontWeight={"bold"}
          boxShadow="lg"
        >
          {props.value}
        </Box>
      </Flex>
    </Box>
  );
};

const ChallengeModal = (props: {
  size: string;
  isOpen: boolean;
  close: Function;
  enter: Function;
  children: any;
  challenge: Challenge;
}) => {
  function getExpiryInDays(createdAt: string, type: string) {
    let date = 3;
    if (type === "SEVEN_DAY") date = 7;
    const day7Plus = new Date(
      new Date(createdAt).getTime() + 1000 * 60 * 60 * 24 * date
    );
    return moment(day7Plus).endOf("D").fromNow(); // in 8 hours
  }

  return (
    <Modal
      size={props.size ?? "sm"}
      isOpen={props.isOpen}
      onClose={() => props.close()}
      isCentered={true}
    >
      <ModalOverlay backdropFilter="blur(5px) hue-rotate(0deg)" />
      <ModalContent background={"none"} boxShadow="none">
        <ModalBody>
          <Box bg={theme.bgColor} borderRadius={"xl"} p={8}>
            <Box
              display={"flex"}
              alignItems={"space-between"}
              justifyContent=""
              flexDirection="column"
              rowGap={"1rem"}
            >
              <Tag
                name={"TYPE"}
                value={props.challenge.challengeType.replace("_", " ")}
              />
              <Tag
                name={"EXPIRES IN"}
                value={getExpiryInDays(
                  props.challenge.createdAt,
                  props.challenge.challengeType
                ).replace("in", "")}
              />
              <Tag name={"ENTRY FEE"} value={props.challenge.entryFee} />
            </Box>

            <Divider
              py={1}
              my={5}
              backgroundImage={`linear-gradient(to top, #eb6612, #ee2e4c, #d4007c, #9828a3, #1442b5)`}
              borderRadius={"xl"}
            />

            <Box
              display={"flex"}
              alignItems={"space-between"}
              justifyContent=""
              flexDirection="column"
              rowGap={"1rem"}
            >
              <Tag name={`1`} value={props.challenge.task.task} />
            </Box>
            <Divider
              py={1}
              my={5}
              backgroundImage={`linear-gradient(to top, #eb6612, #ee2e4c, #d4007c, #9828a3, #1442b5)`}
              borderRadius={"xl"}
            />
            <Flex justifyContent={"flex-end"}>
              <Box display={"flex"} columnGap="1rem">
                <Button
                  transition={"200ms all ease-in"}
                  bg={theme.fgColor}
                  color={theme.primaryTextColor}
                  _hover={{
                    outline: theme.primaryTextColor,
                    border: `1px solid ${theme.primaryTextColor}`,
                  }}
                  outline="none"
                  border={`2px solid ${theme.primaryTextColor}`}
                  boxShadow="md"
                  fontWeight={"bold"}
                  variant={"outline"}
                  animation={"celebrate_blinker 1.5s infinite"}
                  onClick={() => props.enter()}
                >
                  Enter
                </Button>
                <Button
                  transition={"200ms all ease-in"}
                  bg={theme.fgColor}
                  color={theme.primaryTextColor}
                  _hover={{
                    outline: theme.primaryTextColor,
                    border: `1px solid ${theme.primaryTextColor}`,
                  }}
                  outline="none"
                  border={`2px solid ${theme.primaryTextColor}`}
                  boxShadow="md"
                  fontWeight={"bold"}
                  variant={"outline"}
                  onClick={() => props.close()}
                >
                  Close
                </Button>
              </Box>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChallengeModal;
