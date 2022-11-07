import { Flex } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";
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
        bg={theme.fgColor}
        p={4}
      >
        <Referral />
      </Flex>
    </MainLayout>
  );
};
export default ReferralLayout;
