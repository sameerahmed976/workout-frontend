import React, { useState } from "react";
import useAuthContext from "./AuthContext";

const useResetPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user, dispatch } = useAuthContext();
  //   console.log(
  //     `* ~ file: useResetPassword.jsx:8 ~ useResetPassword ~ user:`,
  //     user
  //   );

  const resetPassword = async (password, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `http://127.0.0.1:5000/api/reset/${user.id}/${user.token}`,
      {
        method: "POST",
        body: JSON.stringify({
          password,
          confirmPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError("Invalid data or Please try again");
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

  return { resetPassword, error, isLoading };
};

export default useResetPassword;