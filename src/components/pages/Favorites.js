import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Layout from "../layout/Layout";
import ProductDisplay from "../ProductDisplay";
import Axios from "../../utils/Axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../redux-state/userSlice";

const FavoritesPage = () => {
  const [faveProducts, setFaveProducts] = useState([]);
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //fetch data from backend
    const fetchProducts = async () => {
      const response = await Axios.get("/get-products");
      setFaveProducts(
        response.data.products.filter((product) => {
          if (user.favorites.includes(product.id)) {
            return product;
          }
        })
      );

      //insert fetched user into the state
      const fetchedUser = response.data.user;

      dispatch(updateUser(fetchedUser));
    };

    fetchProducts();
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <Layout>
      <Typography
        display='flex'
        flexDirection='column'
        textAlign='center'
        fontSize='xx-large'
        marginBottom='5%'
      >
        Favorites
      </Typography>
      <Stack
        margin='10px'
        direction='row'
        justifyContent='center'
        sx={{ flexWrap: "wrap", gap: 1 }}
      >
        {faveProducts.map((product, index) => (
          <ProductDisplay productData={product} key={product.id} />
        ))}
      </Stack>
    </Layout>
  );
};

export default FavoritesPage;
