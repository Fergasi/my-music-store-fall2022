import React, { createContext, useState, useContext } from "react";

export const shoppingCartContext = createContext();

export const useShoppingCart = () => useContext(shoppingCartContext);

const ShoppingCartContextProvider = (props) => {
  const { children } = props;
  const initialCartState = [];
  const [shoppingCart, setShoppingCart] = useState(initialCartState);

  const addToCart = (productData) => {
    // Check if the product already exist in the shopping cart
    const productFound = shoppingCart.find(
      (cartItem) => cartItem.id === productData.id
    );

    if (productFound) {
      // we want to return the exact same shopping cart.
      // Except that we want to update the quantity and total.
      const newShoppingCart = shoppingCart.map((cartItem) => {
        if (cartItem.id === productFound.id) {
          const newItemQuantity = cartItem.quantity + 1;
          return {
            ...cartItem,
            quantity: newItemQuantity,
            total: newItemQuantity * cartItem.price,
          };
        }

        return cartItem;
      });

      setShoppingCart(newShoppingCart);
    } else {
      // if we don't find the product, we want to add it to the shopping cart for the first time.
      const newCartItem = {
        ...productData,
        quantity: 1,
        total: productData.price,
      };
      setShoppingCart([...shoppingCart, newCartItem]);
    }
  };

  const removeFromCart = (productData) => {
    // remove item from cart that match the product id.
    const newCart = shoppingCart.map((item) => {
      if (item.id === productData.id) {
        return {
          ...item,
          quantity: item.quantity - 1,
          total: item.price * (item.quantity - 1),
        };
      }
      return item;
    });

    const filteredCart = newCart.filter((item) => {
      if (item.quantity !== 0) {
        return item;
      }
    });

    setShoppingCart(filteredCart);
  };

  const emptyCart = () => setShoppingCart(initialCartState);

  return (
    <shoppingCartContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
        addToCart,
        emptyCart,
        removeFromCart,
      }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
};

export default ShoppingCartContextProvider;
