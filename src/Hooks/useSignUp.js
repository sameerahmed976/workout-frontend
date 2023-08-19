import React, { useState } from "react";
import useAuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useSignUp = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(true);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, username) => {
    setIsLoading(true);
    // setError(null);

    const response = await fetch(
      // " https://workout-tracker-api-jbbj.onrender.com/api/signup",
      "https://workout-tracker-api-jbbj.onrender.com/api/signup",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(`* ~ file: useSignUp.jsx:23 ~ signup ~ response`, response);
    const data = await response.json();
    // console.log(`* ~ file: useSignUp.js:30 ~ signup ~ data:`, data);

    if (response.ok) {
      setIsLoading(false);
      setError(false);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      toast.success("register is successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/home");
    }

    if (!response.ok) {
      // console.log("first");
      setError(true);
      setIsLoading(false);
      toast.error(`${data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return { signup, error, isLoading };
};

export default useSignUp;
