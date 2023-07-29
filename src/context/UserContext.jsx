import React, { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    case "RESET_PASSWORD":
      return {
        ...state,
        data: action.payload,
      };
    case "NEW_PASSWORD":
      return {
        user: action.payload,
      };
    default:
      state;
  }
};

const initialState = {
  user: null,
};

const UserContext = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({
        type: "LOGIN",
        payload: user,
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default UserContext;
