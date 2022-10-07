import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { cartReducer } from "./shoppingCartSlice";

const preloadedState = JSON.parse(localStorage.getItem("application"))
  ? JSON.parse(localStorage.getItem("application"))
  : { user: null, shoppingCart: [] };

const store = configureStore({
  reducer: {
    user: userReducer,
    shoppingCart: cartReducer,
  },
  preloadedState: preloadedState,
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem("application", JSON.stringify(state));
});

export default store;
