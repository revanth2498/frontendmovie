import React, { useState } from "react";
import { useNavigate,NavLink } from "react-router-dom";
import { Button, TextField, Typography, Container, Link } from "@mui/material";
import movieimg from "./loginBg.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username,
        password,
      };
      const response = await fetch(
        "https://backendformoviereview.onrender.com/User/loginValidation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      console.log(response);
      console.log(data);
      if (data.message === "Loging successful") {
        navigate("/search");
        sessionStorage.clear();
        sessionStorage.setItem("UserName", username);
      } else {
        alert('invalid credentials please check again');
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div
      component="main"
      maxWidth="xs"
      style={{
        backgroundImage: `url(${movieimg})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="xs"
        style={{
          backgroundImage: ``,
          backgroundSize: "cover",
          backgroundPosition: "10% 20%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </form>
        
        <NavLink to="/signup" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            Create an account
          </Typography>
        </NavLink>
      </Container>
    </div>
  );
};

export default Login;
