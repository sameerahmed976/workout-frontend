import React, { useState } from "react";
import useAuthContext from "./AuthContext";
import { toast } from "react-toastify";

export const useForgetPassword = () => {
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
      // ` http://localhost:5000/api/reset/forgetPassword`,
      ` http://localhost:5000/api/reset/forgetPassword`,
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

    if (response.ok) {
      setIsLoading(false);
      setError(null);
      //   localStorage.setItem("user", JSON.stringify(data));
      dispatch({
        type: "RESET_PASSWORD",
        payload: data,
      });

      toast.success("email sent successfully", {
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

  return { forgetPassword, error, isLoading };
};
