import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeFromCart } from "../redux-state/shoppingCartSlice";
import { useDispatch } from "react-redux";

const CartProductsDisplay = (props) => {
  const dispatch = useDispatch();
  const { productData } = props;

  const onRemoveFromCart = () => {
    dispatch(removeFromCart(productData.id));
  };

  return (
    <Card
      sx={{
        width: "70vw",
        height: "80px",
        border: "1px solid black",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img
          src={productData.image}
          style={{ height: "100%", width: "60px", padding: "5px" }}
        ></img>
        <Box style={{ padding: "15px" }}>
          <Box style={{ width: "120px", padding: "5px" }}>
            {productData.title}
          </Box>
          <Box style={{ width: "120px", padding: "5px" }}>
            {productData.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Box>
        </Box>
      </Box>

      <CardActions disableSpacing>
        <Box display='flex' justifyContent='space-between' width={1}>
          <Box>x{productData.quantity}</Box>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <DeleteIcon onClick={onRemoveFromCart} />
        </Box>
      </CardActions>
    </Card>
  );
};

export default CartProductsDisplay;
