import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Wordle from "./pages/Game/Wordle/Wordle";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import { useEffect, useState } from "react";
import Page403 from "./pages/Auth/Page403";
// import PrivateRoute from "./config/protected.router";

export const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) setIsAuth(true);
    else setIsAuth(false);
  }, [isAuth]);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:game/:contestId/:gameStateId" element={<Wordle />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/403" element={<Page403 />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};
