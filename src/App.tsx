import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Wordle from "./pages/Wordle/Wordle";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Page403 from "./pages/Auth/Page403";
import Axle from "./pages/Axle/Axle";
import Dashboard from "./pages/DashBoard/DashBoard";
import Profile from "./pages/DashBoard/pages/Profile";
import ReferralLayout from "./pages/Referral/ReferralLayout";
import Lobby from "./pages/Wordle/Lobby";
import Wallet from "./pages/Wallet/Wallet";
import ComingSoon from "./pages/ComingSoon";
import SignupPage from "./pages/Auth/SignUpPage";
import Absurdle from "./pages/Wordle/Absurdle";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
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
          <Route
            path="/absurdle/:contestId/:gameStateId/:isContest"
            element={<Absurdle />}
          />
          <Route
            path="/:game/:contestId/:gameStateId/:isContest"
            element={<Wordle />}
          />

          <Route
            path="/absurdle/lobby/:contestId/:gameStateId"
            element={<Lobby />}
          />
          <Route
            path="/:game/lobby/:contestId/:gameStateId"
            element={<Lobby />}
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/403" element={<Page403 />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};
