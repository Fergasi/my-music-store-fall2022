import React, { createContext, useContext, useReducer } from "react";

export const shoppingCartContext = createContext();
export const useShoppingCart = () => useContext(shoppingCartContext);

const ADD_TO_CART = "add-to-cart";
const REMOVE_FROM_CART = "remove-from-cart";
const EMPTY_CART = "empty-cart";

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      // Check if the product already exist in the shopping cart
      const productFound = state.find(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (productFound) {
        // we want to return the exact same shopping cart.
        // Except that we want to update the quantity and total.
        const newShoppingCart = state.map((cartItem) => {
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

        return newShoppingCart;
      } else {
        // if we don't find the product, we want to add it to the shopping cart for the first time.
        const newCartItem = {
          ...action.payload,
          quantity: 1,
          total: action.payload.price,
        };
        return [...state, newCartItem];
      }
    }

    case REMOVE_FROM_CART: {
      // remove item from cart that match the product id.
      const newCart = state.map((item) => {
        if (item.id === action.payload.id) {
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

      return filteredCart;
    }

    case EMPTY_CART: {
      return [];
    }

    default: {
      return state;
    }
  }
};

const ShoppingCartContextProvider = (props) => {
  const { children } = props;
  const initialCartState = [];
  const [shoppingCart, dispatch] = useReducer(cartReducer, initialCartState);

  const addToCart = (productData) =>
    dispatch({ type: ADD_TO_CART, payload: productData });

  const removeFromCart = (productData) =>
    dispatch({ type: REMOVE_FROM_CART, payload: productData });

  const emptyCart = () => dispatch({ type: EMPTY_CART });

  return (
    <shoppingCartContext.Provider
      value={{
        shoppingCart,
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
