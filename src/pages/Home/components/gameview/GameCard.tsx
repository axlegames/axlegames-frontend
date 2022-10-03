import { Box, Button, GridItem, Image, Text } from "@chakra-ui/react";
import { theme } from "../../../../config/theme.config";

const GameCard = (props: any) => {
  console.log(props);
  return (
    <GridItem
      position={"relative"}
      key={props.index}
      backgroundSize={"cover"}
      backgroundRepeat={"no-repeat"}
      borderRadius={"2xl"}
    >
      <Image
        zIndex={0}
        src={props.axleGame.image}
        borderRadius={"2xl"}
        _hover={{
          transform: "scale(1.05)",
          transition: "200ms all ease-in",
        }}
      />
      <Box
        display={"flex"}
        justifySelf="center"
        alignSelf={"center"}
        position="absolute"
        zIndex={2}
        top="0"
      >
        <Box
          p="2"
          m="2"
          color={theme.bgColor}
          bg={props.colors[props.index]}
          borderRadius={"md"}
          opacity={0.9}
        >
          <Text zIndex={2} fontWeight={"bold"} fontSize="smaller">
            {props.axleGame.name}
          </Text>
        </Box>
      </Box>

      {!props.axleGame.isActive ? (
        <Box position={"absolute"} fontSize="smaller" bottom="2" right={"2"}>
          <Box
            bg={theme.bgColor}
            px={"3"}
            py="2"
            borderRadius={"md"}
            opacity={0.8}
          >
            <Text color={theme.highLightColor} fontWeight={"bold"}>
              Coming Soon
            </Text>
          </Box>
        </Box>
      ) : (
        <Box position={"absolute"} bottom="2" right={"2"}>
          <Button
            size={"sm"}
            variant={"ghost"}
            _hover={{
              color: theme.bgColor,
              bg: theme.primaryColor,
            }}
            bg={"green.700"}
            opacity={0.9}
            color={theme.highLightColor}
            onClick={() => props.openModal(props.axleGame, props.index)}
          >
            Play Now{" "}
          </Button>
        </Box>
      )}
    </GridItem>
  );
};

export default GameCard;
