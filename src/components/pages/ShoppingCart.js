import React, { useContext, useState, useEffect } from "react";
import { Box } from "@mui/material";
import Layout from "../layout/Layout";
import CartProductsDisplay from "../CartProductsDisplay";
import { productList } from "../../mockData";
import { UserLoginContext } from "../../App";

const ShoppingCart = () => {
  const { shoppingCart } = useContext(UserLoginContext);
  const [counter, setCounter] = useState({});

  const cartItemsToMap = () => {
    const newArr = [];

    Object.keys(counter).forEach((key) => {
      const item = productList.find((product) => product.id === key);
      newArr.push(item);
    });
    return newArr;
  };

  const cartTotal = () => {
    let total = 0;
    shoppingCart.products.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  useEffect(() => {
    const counter = {};

    shoppingCart.products.forEach(function (obj) {
      var key = obj.id;
      counter[key] = (counter[key] || 0) + 1;
    });
    setCounter(counter);
    console.log("counter: ", counter);
  }, [shoppingCart]);

  return (
    <Layout>
      <Box display='flex' flexDirection='column' alignItems='center'>
        {cartItemsToMap().map((product, idx) => {
          return (
            <Box mb={6} key={idx} bgcolor='white'>
              <CartProductsDisplay
                productData={product}
                count={counter[product.id]}
              />
            </Box>
          );
        })}
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center'>
        {cartTotal() === 0 && <h2>Nothing in your cart...</h2>}
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h3>Total:</h3>&nbsp;
          {cartTotal().toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Box>
      </Box>
    </Layout>
  );
};

export default ShoppingCart;
