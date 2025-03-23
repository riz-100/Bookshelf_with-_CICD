// Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/signup.css";
import { Typography, TextField, Button } from "@mui/material";

const Signup = ({ onSignup }) => {
  const backendURL =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_BACKEND_URL_DEVELOPMENT
      : process.env.REACT_APP_BACKEND_URL_PRODUCTION;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [Error, setError] = useState("");
  const Navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return; // Exit function if password is invalid
    }
    try {
      const response = await axios.post(`${backendURL}/users/register`, {
        email,
        password,
        name,
      });
      console.log("Signup successful");

      const authToken = response.data.token;
      const ID = response.data.id;

      setRegistrationSuccess(true);

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userID", response.data.id);

      onSignup(ID, authToken);

      // Redirect user to dashboard or bookshelf upon successful signup
      Navigate(`/bookshelf/:${response.data.id}`);
    } catch (error) {
      console.log(error.status);
      if (error.response.status === 400) {
        setError("Email already exists");
      } else {
        console.error("Signup failed:", error.response.status);
        setError("Signup failed");
      }

      // Display error message to user
    }
  };

  return (
    <div className="signup-container">
      <Typography variant="h5" color="white" gutterBottom>
        There is no friend as loyal as a book
      </Typography>
      <Typography variant="body1" color="white">
        Embark on your reading journey. Let's get started!
      </Typography>{" "}
      {/* Apply container class */}
      {registrationSuccess && (
        <p className="success-message">Registration successful!</p>
      )}
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Signup</h2>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2, input: { color: "white" }, label: { color: "white" } }}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2, input: { color: "white" }, label: { color: "white" } }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2, input: { color: "white" }, label: { color: "white" } }}
        />
        {Error && <p className="error-message">{Error}</p>}{" "}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Signup
        </Button>
        <Link to="/login" className="login-link">
          Login
        </Link>
      </form>
    </div>
  );
};

export default Signup;
