import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { theme } from "../../config/theme.config";
import MainLayout from "../../layouts/MainLayout";
import WalletHeader from "./components/WalletHeader";
import WalletTranscations from "./components/WalletTranscations";
import { Transactions, WalletServices } from "./WalletServices";

const Wallet = () => {
  const [transactions, setTransactions] = useState<Transactions>();

  useEffect(() => {
    WalletServices.getUserTransactions()
      .then((res) => {
        setTransactions(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MainLayout>
      <Box
        bg={theme.fgColor}
        p={4}
        borderRadius="xl"
        fontFamily="quicksand"
        fontWeight={"bold"}
      >
        <WalletHeader balance={transactions?.balance || 0} />
        <WalletTranscations transactions={transactions?.transactions || []} />
      </Box>
    </MainLayout>
  );
};

export default Wallet;
