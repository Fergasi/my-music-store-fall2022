import React, { createContext, useState } from "react";

export const shoppingCartContext = createContext();

const ShoppingCartContextProvider = (props) => {
  const { children } = props;
  const [shoppingCart, setShoppingCart] = useState([]);
  return (
    <shoppingCartContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
      }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
};

export default ShoppingCartContextProvider;
