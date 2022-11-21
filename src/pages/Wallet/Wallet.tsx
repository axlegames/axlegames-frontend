import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TokenAuthStatus } from "../../config/auth";
import { theme } from "../../config/theme.config";
import MainLayout from "../../layouts/MainLayout";
import WalletHeader from "./components/WalletHeader";
import WalletTranscations from "./components/WalletTranscations";
import { Transactions, WalletServices } from "./WalletServices";

const Wallet = () => {
  const [transactions, setTransactions] = useState<Transactions>({
    balance: 0,
    transactions: [],
  });
  const navigate = useNavigate();

  const isAuthorized = (status: TokenAuthStatus) => {
    if (
      status.valueOf().toString() ===
      TokenAuthStatus.UNAUTHORIZED.valueOf().toString()
    ) {
      localStorage.clear();
      navigate("/");
      return window.location.reload();
    }
  };

  useEffect(() => {
    WalletServices.getUserTransactions()
      .then((res) => {
        console.log(res);
        isAuthorized(res as TokenAuthStatus);
        res = res as Transactions;
        setTransactions(res);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout isNavbarHidden={true}>
      <Box
        bg={theme.fgColor}
        p={4}
        borderRadius="xl"
        fontFamily="quicksand"
        fontWeight={"bold"}
      >
        <WalletHeader balance={transactions.balance} />
        <WalletTranscations transactions={transactions.transactions} />
      </Box>
    </MainLayout>
  );
};

export default Wallet;
