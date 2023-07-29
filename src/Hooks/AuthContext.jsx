import { useContext } from "react";
import { AuthContext } from "../context/UserContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};

export default useAuthContext;
