import { Flex, Grid } from "@chakra-ui/react";
import HighLightCard from "./HighLightCard";

const Rewards = () => {
  return (
    <Flex direction={"column"}>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
          lg: "1fr",
          xl: "1fr 1fr 1fr ",
          "2xl": "1fr 1fr 1fr 1fr",
        }}
        columnGap="1rem"
        rowGap={"1rem"}
      >
        <HighLightCard mainText="Referral Reward" subText="200 $AXLE" />
        <HighLightCard mainText="Referral Reward" subText="200 $AXLE" />
        <HighLightCard mainText="Referral Reward" subText="200 $AXLE" />
        <HighLightCard mainText="Referral Reward" subText="200 $AXLE" />
        <HighLightCard mainText="Inactive Reward" subText="300 $AXLE" />
        <HighLightCard mainText="Staking Reward" subText="100 $AXLE" />
      </Grid>
    </Flex>
  );
};

export default Rewards;
