import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Error from "./components/Pages/Error";
import Home from "./components/Pages/Home";
import Layout from "./components/shared/Layout";
import SignUp from "./components/Pages/SignUp";
import Login from "./components/Pages/Login";
import useAuthContext from "./Hooks/AuthContext";
import AboutMe from "./components/Pages/AboutMe";
import ForgetPassword from "./components/Pages/ForgetPassword";
import NewPassword from "./components/Pages/NewPassword";
import DefaultPage from "./components/Pages/DefaultPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={user ? <Home /> : <DefaultPage />} />
            <Route
              path="/aboutMe"
              element={user ? <AboutMe /> : <Navigate to="/home" />}
            />
            <Route path="/reset/:token/:id" element={<NewPassword />} />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/home"
              element={user ? <Home /> : <Navigate to="/" />}
            />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
