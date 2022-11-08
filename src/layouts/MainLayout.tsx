import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { theme } from "../config/theme.config";
import MobileNavbar from "../pages/Home/components/navbars/MobileNavbar";
import Navbar from "../pages/Home/components/navbars/Navbar";
import SideBarLayout from "./SideBarLayout";

const MainLayout = (props: any) => {
  const [open, setOpen] = useState(false);
  const scrollUpFun = () => ref.current.scroll({ top: 0, behavior: "smooth" });
  const ref = useRef<any>(null);
  const isNavbarHidden = props.isNavbarHidden || false;

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
        <GridItem
          py={12}
          pb={{ base: "40", lg: "12" }}
          maxH={"100vh"}
          overflowY="scroll"
          ref={ref}
        >
          {!isNavbarHidden ? (
            <Navbar
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
            />
          ) : null}
          {props.children}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MainLayout;
