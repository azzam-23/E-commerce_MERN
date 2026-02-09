import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

const CartPage = () => {
  const { token } = useAuth();
  const [cart, setCart] = useState();

  useEffect(() => {
    if (!token) return;

    const fetchCart = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ string now
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch cart:", response.status);
          return;
        }

        const data = await response.json();
        setCart(data);
      } catch (err) {
        console.error("Cart error:", err);
      }
    };

    fetchCart();
  }, [token]);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </Container>
  );
};

export default CartPage;
