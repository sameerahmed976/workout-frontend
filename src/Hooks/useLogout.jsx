import useAuthContext from "./AuthContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT",
    });

    dispatch({
      type: "DELETE_WORKOUTS",
    });
  };

  return { logout };
};

export default useLogout;
