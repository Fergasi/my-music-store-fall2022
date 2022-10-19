import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Axios from "../../utils/Axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  InputLabel,
  Button,
  OutlinedInput,
  FormControl,
  Box,
} from "@mui/material";

const CreateProductPage = () => {
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [error, setError] = useState();
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    brand: "",
    price: "",
    image: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(undefined);
    try {
      const response = await Axios.post("/create-product", {
        productData: {
          title: productData.title,
          description: productData.description,
          brand: productData.brand,
          price: Number(productData.price),
          image: productData.image,
        },
      });

      console.log(response);
      navigate("/");
    } catch (e) {
      setError(`${e.response.data.message}, please try again`);
      setTimeout(() => {
        setError("");
      }, "4000");
    }
  };

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
    }
  }, [user]);

  //   if (!user || !user.isAdmin) {
  //     return "redirecting now......";
  //   }

  return (
    <Layout>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        style={{ marginTop: "5vh" }}
      >
        <Typography fontWeight='bold' fontSize='larger'>
          Create New Product
        </Typography>
      </Box>
      <form action='submit' onSubmit={handleSubmit}>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          style={{ marginTop: "5vh" }}
        >
          <FormControl sx={{ m: 1, width: "25ch" }} variant='outlined'>
            <InputLabel htmlFor='productTitle'>Title</InputLabel>
            <OutlinedInput
              id='productTitle'
              value={productData.title}
              onChange={(event) =>
                setProductData({ ...productData, title: event.target.value })
              }
              required
              label='Title'
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant='outlined'>
            <InputLabel htmlFor='productDescription'>Description</InputLabel>
            <OutlinedInput
              id='productDescription'
              value={productData.description}
              onChange={(event) =>
                setProductData({
                  ...productData,
                  description: event.target.value,
                })
              }
              required
              label='Description'
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant='outlined'>
            <InputLabel htmlFor='productBrand'>Brand</InputLabel>
            <OutlinedInput
              id='productBrand'
              value={productData.brand}
              onChange={(event) =>
                setProductData({ ...productData, brand: event.target.value })
              }
              label='Brand'
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant='outlined'>
            <InputLabel htmlFor='productPrice'>Price ($USD)</InputLabel>
            <OutlinedInput
              id='productPrice'
              value={productData.price}
              onChange={(event) =>
                setProductData({ ...productData, price: event.target.value })
              }
              label='Price ($USD)'
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant='outlined'>
            <InputLabel htmlFor='productImage'>Image</InputLabel>
            <OutlinedInput
              id='productImage'
              value={productData.image}
              onChange={(event) =>
                setProductData({ ...productData, image: event.target.value })
              }
              label='Image'
            />
          </FormControl>
          <br />

          <img
            src={productData.image ? productData.image : "/imgPlaceholder.png"}
            alt='product image'
            style={{ width: "345px", height: "294px", objectFit: "cover" }}
          />

          <br />
          {error && (
            <Alert
              severity='error'
              sx={{
                position: "absolute",
                zIndex: "1",
                left: "50%",
                top: "30%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {error}
            </Alert>
          )}
          <br />
          <Button type='submit' variant='contained' color='success'>
            Submit
          </Button>
        </Box>
      </form>
    </Layout>
  );
};

export default CreateProductPage;
