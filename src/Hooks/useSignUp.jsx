import React, { useState } from "react";
import useAuthContext from "./AuthContext";

const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, username) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://127.0.0.1:5000/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(`* ~ file: useSignUp.jsx:23 ~ signup ~ response`, response);
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      // console.log(`* ~ file: useSignUp.jsx:24 ~ signup ~ data`, data);
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

  return { signup, error, isLoading };
};

export default useSignUp;
