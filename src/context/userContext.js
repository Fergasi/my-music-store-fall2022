import React, { createContext, useReducer } from "react";
export const userContext = createContext();

const SIGN_IN = "sign-in";
const SIGN_OUT = "sign-out";

const userReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN: {
      return { ...action.payload };
    }
    case SIGN_OUT: {
      return undefined;
    }

    default: {
      return state;
    }
  }
};

const UserContextProvider = (props) => {
  const { children } = props;
  const intialUserState = undefined;

  const [user, dispatch] = useReducer(userReducer, intialUserState);

  const signIn = (userData) => dispatch({ type: SIGN_IN, payload: userData });

  const signOut = () => dispatch({ type: SIGN_OUT });

  return (
    <userContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
