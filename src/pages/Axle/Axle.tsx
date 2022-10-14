import { Flex } from "@chakra-ui/react";

import MainLayout from "../../layouts/MainLayout";
import UtilityGrid from "./component/UtilityGrid";
import WhitePaper from "./component/WhitePaper";
import AxleInfo from "./component/AxleInfo";
import AxleHeader from "./component/AxleHeader";

const Axle = () => {
  return (
    <MainLayout>
      <Flex
        py={12}
        pb={{ base: "40", lg: "12" }}
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