import { Box, Button, Container, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

const RegisterPage = () => {
  const[error, setError] = useState("")
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const {login} = useAuth();

  

  const onsubmit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if(!firstName|| !lastName || !email || !password) {
      setError("check sumbiting data!")
      return;
    }

    console.log(firstName,lastName, email, password);

    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers:{
        'Content-Type':"application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if(!response.ok){
      setError("Unable to register user please try again")
      return;
    }

    const token = await response.json();
if(!token){
  setError("incorrect token")
  return;
}
 
  login(email,token);


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
      <Typography variant="h6">Register New Account</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
          width: "200px",
        }}
      >
        <TextField inputRef={firstNameRef} label="First Name" name="fullName" />
        <TextField inputRef={lastNameRef} label="Last Name" name="lastname" />
        <TextField inputRef={emailRef} label="Email" name="email" />
        <TextField
          inputRef={passwordRef}
          label="Password"
          name="password"
          type="password"
        />
        <Button onClick={onsubmit} variant="contained">
          REGISTER
        </Button>
        {error && <Typography sx={{color:"red"}}>{error}</Typography>}
      </Box>
    </Container>
  );
};

export default RegisterPage;
