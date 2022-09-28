import { Box } from "@mui/material";
import { productList } from "../../mockData";
import Layout from "../layout/Layout";
import ProductDisplay from "../ProductDisplay";

function HomePage() {
  return (
    <Layout>
      <Box display='flex' flexDirection='column' alignItems='center'>
        {productList.map((product, index) => (
          <Box key={product.id} mb={6} bgcolor='pink'>
            <ProductDisplay productData={product} />
          </Box>
        ))}
      </Box>
    </Layout>
  );
}

export default HomePage;
