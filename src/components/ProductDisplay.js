import React, { useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux-state/shoppingCartSlice";
import { updateUser } from "../redux-state/userSlice";
import Axios from "../utils/Axios";

function ProductDisplay(props) {
  const user = useSelector((state) => state.user);
  const { productData } = props;
  const dispatch = useDispatch();
  const [favorited, setFavorited] = useState(
    user && user.favorites.includes(productData.id) ? true : false
  );
  const onAddToCart = () => {
    dispatch(addToCart(productData));
  };

  const onAddToFavourites = async () => {
    try {
      //call the back end with the login credentials
      const response = await Axios.post("/add-to-favorites", {
        productId: productData.id,
      });

      //insert fetched user into the state
      const fetchedUser = response.data.user;

      dispatch(updateUser(fetchedUser));
    } catch (e) {
      console.log(e);
    }
  };

  const handleIconClick = () => {
    onAddToFavourites();
    setFavorited(!favorited);
  };

  return (
    <Card
      sx={{ width: 345 }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardHeader title={productData.title} subheader={productData.brand} />
      <CardMedia
        component='img'
        height='294'
        image={productData.image}
        alt='Product'
      />
      <CardContent>
        <Typography
          variant='body2'
          color='text.secondary'
          height='40px'
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {productData.description}
        </Typography>
        <br />
        <Typography variant='body' color='text.primary'>
          {productData.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box display='flex' justifyContent='space-between' width={1}>
          <Button onClick={onAddToCart}>Add to cart</Button>
          <IconButton onClick={handleIconClick} aria-label='add to favorites'>
            <FavoriteIcon color={favorited ? "error" : undefined} />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}

export default ProductDisplay;
