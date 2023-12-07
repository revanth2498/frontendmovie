// // // src/components/Signup.js
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const Signup = () => {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const history = useNavigate();

// //   const handleSignup = async () => {
// //     try {
// //       await fetch("http://localhost:3001/signup", { username, password });
// //       history.push("/home");
// //     } catch (error) {
// //       console.error("Signup failed:", error.message);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Signup</h2>
// //       <label>Username:</label>
// //       <input
// //         type="text"
// //         value={username}
// //         onChange={(e) => setUsername(e.target.value)}
// //       />
// //       <br />
// //       <label>Password:</label>
// //       <input
// //         type="password"
// //         value={password}
// //         onChange={(e) => setPassword(e.target.value)}
// //       />
// //       <br />
// //       <button onClick={handleSignup}>Signup</button>
// //     </div>
// //   );
// // };

// // export default Signup;
// // src/components/Signup.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     try {
//       const userData = {
//         username,
//         password,
//         name,
//         email,
//       };

//       const response = await fetch("https://backendformoviereview.onrender.com/User/createUser", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       const data = await response.json();
//       if (data.message === "User created") {
//         navigate("/login");
//       } else {
//         console.error("Signup failed:", data.message);
//       }
//     } catch (error) {
//       console.error("Signup failed:", error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <label>Username:</label>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <br />
//       <label>Password:</label>
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <br />
//       <label>Name:</label>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <br />
//       <label>Email:</label>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <br />
//       <button onClick={handleSignup}>Signup</button>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Container, Link } from "@mui/material";
import movieimg from "./loginBg.jpg";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const userData = {
        username,
        password,
        name,
        email,
      };

      const response = await fetch("https://backendformoviereview.onrender.com/User/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (data.message === "User created") {
        navigate("/login");
      } else {
        console.error("Signup failed:", data.message);
      }
    } catch (error) {
      console.error("Signup failed:", error.message);
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
          Signup
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
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSignup}>
            Signup
          </Button>
          <NavLink to="/login" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" style={{ marginTop: '10px' }}>
          Already have an account? Login
          </Typography>
        </NavLink>
          {/* <Link href="/login" variant="body2" style={{ marginLeft: "10px" }}>
            Already have an account? Login
          </Link> */}
        </form>
      </Container>
    </div>
  );
};

export default Signup;
