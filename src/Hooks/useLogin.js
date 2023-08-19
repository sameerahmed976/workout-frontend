import React, { useState } from "react";
import useAuthContext from "./AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      // " http://localhost:5000/api/login",
      "http://localhost:5000/api/login",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      setIsLoading(false);
      setError(null);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      toast.success("login  is successfully", {
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

  return { login, error, isLoading };
};
