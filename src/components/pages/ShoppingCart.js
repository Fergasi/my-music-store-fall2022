import React, { useContext, useState, useEffect } from "react";
import { Box } from "@mui/material";
import Layout from "../layout/Layout";
import CartProductsDisplay from "../CartProductsDisplay";
import { productList } from "../../mockData";
import { shoppingCartContext } from "../../context/shoppingCartContext";

const ShoppingCart = () => {
  const { shoppingCart } = useContext(shoppingCartContext);
  const [counter, setCounter] = useState({});
  const [itemsToMap, setItemsToMap] = useState([]);

  const cartTotal = () => {
    let total = 0;
    shoppingCart.forEach((item) => {
      total += item.price;
    });
    // console.log("cartTotal", total);
    return total;
  };

  useEffect(() => {
    const counter = {};
    const newArr = [];

    shoppingCart.forEach(function (obj) {
      var key = obj.id;
      counter[key] = (counter[key] || 0) + 1;
    });

    Object.keys(counter).forEach((key) => {
      const item = productList.find((product) => product.id === key);
      newArr.push(item);
    });

    setItemsToMap(newArr);
    setCounter(counter);
    console.log("counter: ", counter);
  }, [shoppingCart]);

  return (
    <Layout>
      <Box display='flex' flexDirection='column' alignItems='center'>
        {itemsToMap.map((product, idx) => {
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
      <Box display='flex' flexDirection='column' alignItems='center'></Box>
    </Layout>
  );
};

export default ShoppingCart;
