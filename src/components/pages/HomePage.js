import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Layout from "../layout/Layout";
import ProductDisplay from "../ProductDisplay";
import Axios from "../../utils/Axios";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //fetch data from backend
    const fetchProducts = async () => {
      const response = await Axios.get("/get-products");
      setProducts(response.data.products);
    };

    fetchProducts();
  }, []);

  return (
    <Layout>
      <Stack
        margin='10px'
        direction='row'
        justifyContent='center'
        sx={{ flexWrap: "wrap", gap: 1 }}
      >
        {products.map((product, index) => (
          <ProductDisplay productData={product} key={product.id} />
        ))}
      </Stack>
    </Layout>
  );
}

export default HomePage;
