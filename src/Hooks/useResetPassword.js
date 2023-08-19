import React, { useState } from "react";
import useAuthContext from "./AuthContext";
import { toast } from "react-toastify";

const useResetPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user, dispatch } = useAuthContext();
  //   console.log(
  //     `* ~ file: useResetPassword.jsx:8 ~ useResetPassword ~ user:`,
  //     user
  //   );

  const resetPassword = async (
    password,
    confirmPassword,
    id = user.id,
    token = user.token
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      ` http://localhost:5000/api/reset/${id}/${token}`,
      // ` http://localhost:5000/api/reset/${id}/${token}`,
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

    if (response.ok) {
      setIsLoading(false);
      setError(null);
      //   localStorage.setItem("user", JSON.stringify(data));
      dispatch({
        type: "RESET_PASSWORD",
        payload: data,
      });

      toast.success(`Reset password successfully`, {
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

  return { resetPassword, error, isLoading };
};

export default useResetPassword;
