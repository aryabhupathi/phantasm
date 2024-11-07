import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useLogin } from "../LoginProvider"; // Import the useLogin hook

const Login = () => {
  const { login } = useLogin(); // Access the login function
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username) {
      login();
    } else {
      alert("Please enter a username.");
    }
  };

  return (
    <div>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Log In
      </Button>
    </div>
  );
};

export default Login;
