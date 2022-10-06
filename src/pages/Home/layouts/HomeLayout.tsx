import { Box } from "@chakra-ui/react";
import GamesView from "../views/GamesView";
import HowToPlayView from "../views/HowToPlayView";
import Footer from "../views/Footer";
import { useEffect } from "react";
interface Props {
  scrollUp: boolean;
  ref: any;
}

const HomeLayout = (props: Props) => {
  useEffect(() => {
    const scrollup = () => props.ref.current.scroll(0, 0);
    if (props.scrollUp) scrollup();
  }, [props.scrollUp, props.ref]);

  return (
    <Box ref={props.ref}>
      <GamesView />
      <HowToPlayView />
      <Footer />
    </Box>
  );
};

export default HomeLayout;
