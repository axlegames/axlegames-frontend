import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { theme } from "../../config/theme.config";
import MobileNavbar from "../Home/components/navbars/MobileNavbar";
import Navbar from "../Home/components/navbars/Navbar";
import SideBarLayout from "../Home/layouts/SideBarLayout";
import GameInView from "./GameInView";

const GameInLayout = (props: any) => {
  const [open, setOpen] = useState(false);
  const scrollUpFun = () => ref.current.scroll({ top: 0, behavior: "smooth" });
  const ref = useRef<any>(null);
  return (
    <Box maxHeight={"100vh"} overflow="hidden" bg={theme.bgColor}>
      <MobileNavbar />
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "2fr 8fr",
        }}
      >
        <GridItem
          maxWidth="380px"
          minWidth={"360px"}
          display={{ base: "none", lg: "flex" }}
          justifyContent="center"
        >
          <SideBarLayout
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            scrollTop={() => scrollUpFun()}
          />
        </GridItem>
        <GridItem maxH={"100vh"} overflowY="scroll" ref={ref}>
          <Navbar
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
          />
          <GameInView />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default GameInLayout;
