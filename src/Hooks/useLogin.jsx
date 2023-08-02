import React, { useState } from "react";
import useAuthContext from "./AuthContext";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      // " https://workout-tracker-api-jbbj.onrender.com/api/login",
      "https://workout-tracker-api-jbbj.onrender.com/api/login",
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

    if (!response.ok) {
      setIsLoading(false);
      setError(data);
    }
    if (response.ok) {
      setIsLoading(false);
      setError(null);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({
        type: "LOGIN",
        payload: data,
      });
    }
  };

  return { login, error, isLoading };
};

export default useLogin;
