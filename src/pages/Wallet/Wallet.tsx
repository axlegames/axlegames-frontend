import { Box } from "@chakra-ui/react";
import { theme } from "../../config/theme.config";
import MainLayout from "../../layouts/MainLayout";
import WalletHeader from "./components/WalletHeader";
import WalletTranscations from "./components/WalletTranscations";

const Wallet = () => {
  return (
    <MainLayout>
      <Box bg={theme.fgColor} p={4} fontFamily="quicksand" fontWeight={"bold"}>
        <WalletHeader />
        <WalletTranscations />
      </Box>
    </MainLayout>
  );
};

export default Wallet;
