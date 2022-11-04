import { Flex } from "@chakra-ui/react";
import MainLayout from "../../layouts/MainLayout";

import Referral from "./Referral";

const ReferralLayout = () => {
  return (
    <MainLayout>
      <Flex
        mt={4}
        borderRadius={"xl"}
        direction={"column"}
        rowGap="1rem"
        fontFamily={"quicksand"}
      >
        <Referral />
      </Flex>
    </MainLayout>
  );
};
export default ReferralLayout;
