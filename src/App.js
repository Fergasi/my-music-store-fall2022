import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import ShoppingCart from "./components/pages/ShoppingCart";
import CustomThemeProvider from "./CustomThemeProvider";
import UserRegistrationPage from "./components/pages/UserRegistrationPage";
import CreateProductPage from "./components/pages/CreateProductPage";
import store from "./redux-state/store";
import { Provider } from "react-redux";
import FavoritesPage from "./components/pages/Favorites";

function App() {
  return (
    <CustomThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/sign-in' element={<LoginPage />} />
            <Route path='/register-user' element={<UserRegistrationPage />} />
            <Route path='/cart' element={<ShoppingCart />} />
            <Route path='/create-product' element={<CreateProductPage />} />
            <Route path='/user-favorites' element={<FavoritesPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </CustomThemeProvider>
  );
}

export default App;
