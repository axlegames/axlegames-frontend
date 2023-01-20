import { Box, ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useState } from "react";

import { Triangle } from "react-loader-spinner";

import Banner from "./layouts/Banner";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Stake from "./pages/Staking/Stake";

const Home = lazy(() => import("./pages/Home/Home"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const Page403 = lazy(() => import("./pages/Auth/Page403"));
const Axle = lazy(() => import("./pages/Axle/Axle"));
const Dashboard = lazy(() => import("./pages/DashBoard/DashBoard"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const ReferralLayout = lazy(() => import("./pages/Referral/ReferralLayout"));
const Wallet = lazy(() => import("./pages/Wallet/Wallet"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const SignupPage = lazy(() => import("./pages/Auth/SignUpPage"));
const Absurdle = lazy(() => import("./pages/Games/games/Absurdle/Absurdle"));
const GuestWordle = lazy(() => import("./pages/Games/games/Guest/GuestWordle"));
const Wordle = lazy(() => import("./pages/Games/games/Wordle/Wordle"));
const WordleLobby = lazy(
  () => import("./pages/Games/games/Wordle/WordleLobby")
);
const AbsurdleLobby = lazy(
  () => import("./pages/Games/games/Absurdle/AbsurdleLobby")
);

const FallBack = () => {
  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      bg={"#061E37"}
      position="fixed"
      zIndex={500}
      margin={0}
      padding={0}
    >
      <Triangle
        height={"100"}
        width={"100"}
        ariaLabel="grid-loading"
        color={"#F46B15"}
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Box>
  );
};

export const App = () => {
  const [banner, setBanner] = useState(true);
  return (
    <Suspense fallback={<FallBack />}>
      <ChakraProvider theme={theme}>
        <Banner close={() => setBanner(false)} isOpen={banner} size="xl" />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/axle-token" element={<Axle />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/referrals" element={<ReferralLayout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/signup/:id" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/staking" element={<Stake />} />
            <Route path="/403" element={<Page403 />} />
            <Route
              path="/leaderboard/:game/:contestId"
              element={<Leaderboard />}
            />
            <Route
              path="/guest/:game/:contestId/:gameStateId"
              element={<GuestWordle />}
            />

            {/* GameRoutes */}
            <Route
              path="/absurdle/:contestId/:gameStateId/:isContest"
              element={<Absurdle />}
            />
            <Route
              path="/absurdle/lobby/:contestId/:gameStateId"
              element={<AbsurdleLobby />}
            />
            <Route
              path="/:game/:contestId/:gameStateId/:isContest"
              element={<Wordle />}
            />
            <Route
              path="/:game/lobby/:contestId/:gameStateId"
              element={<WordleLobby />}
            />
          </Routes>
        </Router>
      </ChakraProvider>
    </Suspense>
  );
};
