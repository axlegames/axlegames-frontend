import { Flex, Grid } from "@chakra-ui/react";
import HighLightCard from "./HighLightCard";
import { HiBriefcase } from "react-icons/hi";
import { MdAccountBalance, MdPeople, MdLocalOffer } from "react-icons/md";
import { useEffect, useState } from "react";
import { DashBoardServices, RewardsModel } from "../DashBoardServices";
import { useNavigate } from "react-router";
import { TokenAuthStatus } from "../../../config/auth";

const Rewards = () => {
  const [reward, setReward] = useState<RewardsModel>({
    balance: 0,
    bonus: 0,
    error: false,
    referral: 0,
    staking: 0,
  });

  const navigate = useNavigate();
  const isAuthorized = (status: TokenAuthStatus) => {
    if (
      status.valueOf().toString() ===
      TokenAuthStatus.UNAUTHORIZED.valueOf().toString()
    ) {
      localStorage.clear();
      navigate("/");
      return window.location.reload();
    }
  };

  useEffect(() => {
    DashBoardServices.getRewardsAndBalance()
      .then((res) => {
        isAuthorized(res as TokenAuthStatus);
        setReward(res as RewardsModel);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          subText={`${reward.staking} AX`}
        />
        <HighLightCard
          icon={MdLocalOffer}
          mainText="Bonus Reward"
          subText={`${reward.bonus} AX`}
        />
        <HighLightCard
          icon={MdPeople}
          mainText="Referral Reward"
          subText={`${reward.referral} AX`}
        />
        <HighLightCard
          icon={MdAccountBalance}
          mainText="Current Balance"
          subText={`${reward.balance} AX`}
        />
      </Grid>
    </Flex>
  );
};

export default Rewards;
