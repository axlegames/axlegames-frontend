import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { theme } from "../../config/theme.config";
import MainLayout from "../../layouts/MainLayout";
import TransactionsBar from "./components/TransactionBar";
import WalletHeader from "./components/WalletHeader";
import WalletTranscations from "./components/WalletTranscations";
import { Fee, Transactions, WalletServices } from "./WalletServices";

const Wallet = () => {
  const [transactions, setTransactions] = useState<Transactions>();
  const [tempTransactions, setTempTransactions] = useState<Fee[]>([]);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    WalletServices.getUserTransactions()
      .then((res) => {
        setTransactions(res);
        setTempTransactions(res.fees);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggle = (i: number) => {
    if (i === 0) setTempTransactions(transactions?.fees || []);
    else setTempTransactions(transactions?.rewards || []);
    setPage(i);
  };

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
        <TransactionsBar onClick={(i: number) => toggle(i)} page={page} />
        <WalletTranscations transactions={tempTransactions || []} />
      </Box>
    </MainLayout>
  );
};

export default Wallet;
