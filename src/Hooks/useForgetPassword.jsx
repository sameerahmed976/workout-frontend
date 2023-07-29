import React, { useState } from "react";
import useAuthContext from "./AuthContext";

const useForgetPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  //   console.log(
  //     `* ~ file: useResetPassword.jsx:8 ~ useResetPassword ~ user:`,
  //     user
  //   );

  const forgetPassword = async (email) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      ` https://workout-tracker-api-jbbj.onrender.com/api/reset/forgetPassword`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
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
      //   localStorage.setItem("user", JSON.stringify(data));
      dispatch({
        type: "RESET_PASSWORD",
        payload: data,
      });
    }
  };

  return { forgetPassword, error, isLoading };
};

export default useForgetPassword;
