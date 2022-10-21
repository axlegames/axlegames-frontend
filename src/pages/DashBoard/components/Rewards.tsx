import { Flex, Grid } from "@chakra-ui/react";
import HighLightCard from "./HighLightCard";
import { HiBriefcase } from "react-icons/hi";
import { MdAccountBalance, MdPeople, MdLocalOffer } from "react-icons/md";
import { useEffect, useState } from "react";
import { DashBoardServices, RewardsModel } from "../DashBoardServices";

const Rewards = () => {
  const [reward, setReward] = useState<RewardsModel>({
    balance: 0,
    bonus: 0,
    error: false,
    referral: 0,
    staking: 0,
  });

  useEffect(() => {
    DashBoardServices.getRewardsAndBalance()
      .then((res) => {
        setReward(res);
      })
      .catch((err) => console.log(err));
  }, []);
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
        <HighLightCard
          icon={HiBriefcase}
          mainText="Staking Reward"
          subText={`${reward.staking} AXLE`}
        />
        <HighLightCard
          icon={MdLocalOffer}
          mainText="Bonus Reward"
          subText={`${reward.bonus} AXLE`}
        />
        <HighLightCard
          icon={MdPeople}
          mainText="Referral Reward"
          subText={`${reward.referral} AXLE`}
        />
        <HighLightCard
          icon={MdAccountBalance}
          mainText="Current Balance"
          subText={`${reward.balance} AXLE`}
        />
      </Grid>
    </Flex>
  );
};

export default Rewards;
