import { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import ShoppingCart from "./components/pages/ShoppingCart";
import CustomThemeProvider from "./CustomThemeProvider";
import UserContextProvider from "./context/userContext";
import ShoppingCartContextProvider from "./context/shoppingCartContext";

function App() {
  return (
    <CustomThemeProvider>
      <UserContextProvider>
        <ShoppingCartContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/sign-in' element={<LoginPage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/cart' element={<ShoppingCart />} />
            </Routes>
          </BrowserRouter>
        </ShoppingCartContextProvider>
      </UserContextProvider>
    </CustomThemeProvider>
  );
}

export default App;
