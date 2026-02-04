import { Box, Button, Container, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const[error, setError] = useState("")
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

   const navigate = useNavigate();

  const {login} = useAuth();

  

  const onsubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if( !email || !password) {
      setError("check sumbiting data!")
      return;
    }

    console.log( email, password);

    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers:{
        'Content-Type':"application/json"
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if(!response.ok){
      setError("Unable to Login user please try again")
      return;
    }

    const token = await response.json();
if(!token){
  setError("incorrect token")
  return;
}
 
  login(email,token);

  navigate('/');

    console.log(token);
  };
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      ></Box>
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
      
        <TextField inputRef={emailRef} label="Email" name="email" />
        <TextField
          inputRef={passwordRef}
          label="Password"
          name="password"
          type="password"
        />
        <Button onClick={onsubmit} variant="contained">
          Login
        </Button>
        {error && <Typography sx={{color:"red"}}>{error}</Typography>}
      </Box>
    </Container>
  );
};

export default LoginPage;
