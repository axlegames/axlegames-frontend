import { Box, Text, Grid, GridItem, Button, Flex } from "@chakra-ui/react";
import { theme } from "../../../config/theme.config";

const EntryCard = (props: any) => (
  <Box position="relative" boxShadow={"md"}>
    {props.fee === 0 ? (
      <Text
        zIndex={1}
        top={-3}
        left={-3}
        my={1}
        bg={theme.ternaryButtonColor}
        color={theme.primaryTwoTextColor}
        px={2}
        borderRadius="sm"
        position="absolute"
        boxShadow={`0px 0px 2px ${theme.primaryTwoTextColor}`}
      >
        Free
      </Text>
    ) : (
      <Text
        zIndex={1}
        top={-3}
        left={-3}
        my={1}
        bg={theme.ternaryButtonColor}
        color={theme.primaryTwoTextColor}
        px={2}
        borderRadius="sm"
        position="absolute"
        boxShadow={`0px 0px 2px ${theme.primaryTwoTextColor}`}
      >
        Paid
      </Text>
    )}
    <Box
      boxShadow={`0px 0px 4px ${theme.secondaryTwoTextColor}`}
      borderTopRadius="lg"
      p={"4"}
    >
      <Grid
        templateColumns="1fr 1fr 2fr"
        alignItems={"center"}
        fontSize={"md"}
        gap={6}
      >
        <GridItem>
          <Flex direction={"column"}>
            <Text>Entry Fee</Text>
            <Text> {props.fee} </Text>
          </Flex>
        </GridItem>

        <GridItem>
          <Flex direction={"column"}>
            <Text>Prize</Text>
            <Text>{props.prize}</Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex justifyContent={"flex-end"}>
            {props.isLive ? (
              <Button
                size="sm"
                onClick={props.action}
                variant={"ghost"}
                color="black"
                bg={"green.400"}
                w={"32"}
              >
                Play
              </Button>
            ) : (
              <Button size="sm" width={"32"} color="black">
                coming soon
              </Button>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
    {props.isLive ? (
      <Box
        borderBottomRadius={"lg"}
        boxShadow={`0px 0px 4px ${theme.secondaryTwoTextColor}`}
        p="2"
      >
        <Text color={theme.primaryTextColor} fontSize={"smaller"}>
          {props.players} + playing now
        </Text>
      </Box>
    ) : null}
  </Box>
);
export default EntryCard;
