import { Box, Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import type { product } from "../types/product";
import { BASE_URL } from "../constants/baseUrl";

const HomePage = () => {
  const [products, setProducts] = useState<product[]>([]);
  const [error,seteror] = useState(false);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        seteror(true);
      }
    };

    fetchData();
  }, []);

  if(error){
    return <Box>something went wrong</Box>
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2} wrap="nowrap" sx={{ overflowX: "auto" }}>
        {products.map(({ _id, title, image, price }) => (
          <Grid key={_id} sx={{ minWidth: 250 }}> {/* Each card gets a unique key */}
            <ProductCard _id={_id} title={title} image={image} price={price} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
