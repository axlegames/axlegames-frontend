import { Box, Text, Grid, GridItem, Button, Flex } from "@chakra-ui/react";

const EntryCard = (props: any) => (
  <Box boxShadow={"md"}>
    <Box
      boxShadow={"md"}
      style={{ boxShadow: "5px -2px -2px -2px black" }}
      borderTopRadius="lg"
      p={"4"}
    >
      <Grid
        templateColumns="1fr 1fr 2fr"
        alignItems={"center"}
        fontSize={"small"}
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
              >
                Play
              </Button>
            ) : (
              <Button size="sm" color="black">
                coming soon
              </Button>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
    {props.isLive ? (
      <Box borderBottomRadius={"lg"} boxShadow="md" p="2">
        <Text>{props.players} + playing now</Text>
      </Box>
    ) : null}
  </Box>
);
export default EntryCard;
