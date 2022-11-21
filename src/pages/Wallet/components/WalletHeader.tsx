import { Box, useToast } from "@chakra-ui/react";

import AXLE from "../../../assets/home/logos/icon.png";
import Trophy from "../../../assets/logos/trophy.webp";

import PreSale from "../../Axle/dialog/PreSaleDialog";
import { useState } from "react";
import Dialog from "../../Axle/dialog/AxleDialog";
import useRazorpay from "react-razorpay";
import { PaymentStatus, WalletServices } from "../WalletServices";
import { TokenAuthStatus } from "../../../config/auth";
import { useNavigate } from "react-router";
import WalletCard from "./WalletCard";

interface WalletProps {
  balance: number;
}

const WalletHeader = (props: WalletProps) => {
  const Razorpay = useRazorpay();
  const toast = useToast();
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

  const handlePayment = async () => {
    const order = await WalletServices.createOrder(Number(orderAmount) * 100);
    isAuthorized(order as TokenAuthStatus);
    const options = {
      key: "rzp_test_VmSch4maQMZS9L", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Axle Games",
      description: "Adding funds",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: async function (response: any) {
        await WalletServices.depositTokens({
          amount: order.amount,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorPaySignature: response.razorpay_signature,
          userId: localStorage.getItem("userId") || "",
        })
          .then((res) => {
            isAuthorized(res as TokenAuthStatus);
            if (res === PaymentStatus.SUCCESS) {
              setTimeout(() => {
                window.location.reload();
              }, 5000);
              return toast({
                title: "Payment Successful",
                description: "Tokens Deposited into your account",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
            }
            return toast({
              title: "Payment Unsuccessful",
              description: "something went wrong",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          })
          .catch((err) => {
            return toast({
              title: "Payment Unsuccessful",
              description: err,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
          });
      },
      prefill: {
        name: localStorage.getItem("username") || "",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response: any) {
      return toast({
        title: "Payment Unsuccessful",
        description: response.error.description,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    });

    rzp1.open();
  };

  const [open, setOpen] = useState(false);
  const [orderAmount, setOrderAmount] = useState("");
  const handleAmount = (p: any) => {
    const amt = p.target.value;
    setOrderAmount(amt);
  };

  return (
    <Box
      display={"grid"}
      columnGap="1rem"
      rowGap={"1rem"}
      justifyContent={"center"}
      p={4}
      borderRadius="xl"
      gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
    >
      <Dialog
        close={() => setOpen(false)}
        children={<PreSale />}
        isOpen={open}
        key={1}
        size={"lg"}
      />

      <WalletCard
        amount={orderAmount}
        handleAmount={handleAmount}
        form={true}
        action={() => handlePayment()}
        img={Trophy}
        label="Add Funds"
        main="Wallet Balance"
        sub={`${props.balance} AXLE`}
      />
      <WalletCard
        form={false}
        amount={""}
        handleAmount={handleAmount}
        action={() => {
          setOpen(true);
        }}
        img={AXLE}
        label="Buy in Presale Token"
        main="Connected Wallet Balance"
        sub="00.00 AXLE"
      />
    </Box>
  );
};

export default WalletHeader;
