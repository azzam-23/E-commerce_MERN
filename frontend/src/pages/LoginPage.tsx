import { Box, Button, Container, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const onsubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Check submitted data!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Unable to login. Please try again.");
        return;
      }

      // ✅ FIX IS HERE
      const data = await response.json();

      if (!data?.token || !data?.username) {
        setError("Invalid login response");
        return;
      }

      // ✅ token MUST be a string
      login(data.username, data.token);

      navigate("/");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <Container>
      <Typography variant="h6">Login to your Account</Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
          width: "200px",
        }}
      >
        <TextField inputRef={emailRef} label="Email" />
        <TextField
          inputRef={passwordRef}
          label="Password"
          type="password"
        />

        <Button onClick={onsubmit} variant="contained">
          Login
        </Button>

        {error && <Typography color="red">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default LoginPage;
