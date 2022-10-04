import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { cartReducer } from "./shoppingCartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    shoppingCart: cartReducer,
  },
});

export default store;
