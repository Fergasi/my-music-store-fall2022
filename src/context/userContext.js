import React, { createContext, useState } from "react";

export const userContext = createContext();

const UserContextProvider = (props) => {
  const { children } = props;
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
