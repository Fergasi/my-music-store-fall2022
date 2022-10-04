import { createSlice } from "@reduxjs/toolkit";

const addToCartReducer = (state, action) => {
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
};

const removeFromCartReducer = (state, action) => {
  // remove item from cart that match the product id.
  const newCart = state.map((item) => {
    if (item.id === action.payload) {
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
};

//Creating a slice, splits your state.
const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: [], //Redux does not accept undefined as a default state.
  reducers: {
    addToCart: (state, action) => addToCartReducer(state, action),
    removeFromCart: (state, action) => removeFromCartReducer(state, action),
    emptyCart: () => [],
  },
});

//Action creators. functions that create our actions when we call them.
export const { addToCart, removeFromCart, emptyCart } =
  shoppingCartSlice.actions;
export const cartReducer = shoppingCartSlice.reducer;
