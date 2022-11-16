import { Grid } from "@chakra-ui/react";

import ProfileCard from "../components/ProfileCard";
import Rewards from "../components/Rewards";

const RewardsAndProfile = () => {
  return (
    <Grid
      columnGap={"1rem"}
      rowGap={"1rem"}
      templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
    >
      <Rewards />
      <ProfileCard />
    </Grid>
  );
};

export default RewardsAndProfile;
