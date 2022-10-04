import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import CartProductsDisplay from "../CartProductsDisplay";
import { emptyCart } from "../../redux-state/shoppingCartSlice";
import { useDispatch, useSelector } from "react-redux";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.shoppingCart);

  const onEmptyCart = () => {
    dispatch(emptyCart());
  };

  return (
    <Layout>
      <Box display='flex' flexDirection='column' alignItems='center'>
        {shoppingCart.map((product, idx) => {
          return (
            <Box mb={6} key={idx} bgcolor='white'>
              <CartProductsDisplay productData={product} />
            </Box>
          );
        })}
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center'>
        {shoppingCart.length === 0 && <h2>Nothing in your cart...</h2>}
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
          {shoppingCart
            .reduce((acc, item) => acc + item.total, 0)
            .toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
        </Box>
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center'></Box>
      <Box mt={5} display='flex' flexDirection='column' alignItems='center'>
        <Box mb={3}>
          <Button variant='contained'>Checkout</Button>
        </Box>
        <Box mb={3}>
          <Button
            variant='contained'
            startIcon={<DeleteIcon />}
            onClick={onEmptyCart}
          >
            Empty Cart
          </Button>
        </Box>
        <Box mb={3}>
          <Link to='/home'>
            <Button variant='contained' startIcon={<HomeIcon />}>
              Home
            </Button>
          </Link>
        </Box>
      </Box>
    </Layout>
  );
};

export default ShoppingCart;
