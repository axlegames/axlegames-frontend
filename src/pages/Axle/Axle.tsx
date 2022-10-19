import { Flex } from "@chakra-ui/react";

import MainLayout from "../../layouts/MainLayout";
import UtilityGrid from "./component/UtilityGrid";
import WhitePaper from "./component/WhitePaper";
import AxleInfo from "./component/AxleInfo";
import AxleHeader from "./component/AxleHeader";
import { theme } from "../../config/theme.config";

const Axle = () => {
  return (
    <MainLayout>
      <Flex
        mt={4}
        borderRadius={"xl"}
        bg={theme.fgColor}
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
