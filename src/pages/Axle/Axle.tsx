import { Flex } from "@chakra-ui/react";
import MainLayout from "../../layouts/MainLayout";

import UtilityGrid from "./views/UtilityGrid";
import WhitePaper from "./views/WhitePaper";
import AxleInfo from "./views/AxleInfo";
import AxleHeader from "./views/AxleHeader";

const Axle = () => {
  return (
    <MainLayout isNavbarHidden={true}>
      <Flex
        mt={4}
        borderRadius={"xl"}
        direction={"column"}
        rowGap="1rem"
        fontFamily={"quicksand"}
      >
        <AxleHeader />
        <AxleInfo />
        <UtilityGrid />
        <WhitePaper />
      </Flex>
    </MainLayout>
  );
};

export default Axle;
