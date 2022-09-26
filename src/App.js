import { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import ShoppingCart from "./components/pages/ShoppingCart";
import CustomThemeProvider from "./CustomThemeProvider";
import { sampleUserData } from "./mockData";
export const UserLoginContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [shoppingCart, setShoppingCart] = useState({ products: [] });

  return (
    <UserLoginContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        shoppingCart,
        setShoppingCart,
      }}
    >
      <CustomThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/sign-in' element={<LoginPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/cart' element={<ShoppingCart />} />
          </Routes>
        </BrowserRouter>
      </CustomThemeProvider>
    </UserLoginContext.Provider>
  );
}

export default App;
