import { Flex } from "@chakra-ui/react";
import ContentGrid from "./component/ContentGrid";

import Header from "./component/Header";
import Highlights from "./component/HighLights";
import Section from "./component/Section";

const GameInView = (props: any) => {
  return (
    <Flex py={12} direction={"column"} rowGap="1rem" fontFamily={"quicksand"}>
      <Header />
      <Section />
      <ContentGrid />
      <Highlights />
    </Flex>
  );
};

export default GameInView;
