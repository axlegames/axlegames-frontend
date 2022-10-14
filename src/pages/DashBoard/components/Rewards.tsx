import { Flex, Grid } from "@chakra-ui/react";
import HighLightCard from "./HighLightCard";

const Rewards = () => {
  return (
    <Flex direction={"column"}>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr",
          lg: "1fr",
          xl: "1fr 1fr",
        }}
        columnGap="1rem"
        rowGap={"1rem"}
        height="100%"
        width={"100%"}
      >
        <HighLightCard mainText="Staking Reward" subText="100 $AXLE" />
        <HighLightCard mainText="Bonus Reward" subText="210 $AXLE" />
        <HighLightCard mainText="Referral Reward" subText="80 $AXLE" />
        <HighLightCard mainText="Current Balance" subText="340 $AXLE" />
      </Grid>
    </Flex>
  );
};

export default Rewards;
