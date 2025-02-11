import "./Login.css";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useFirebase } from "../../context/firebaseContext";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCred = await firebase.signInUser(email, password);
      console.log("User logged in:", userCred);

      // Redirect to tasks page
      navigate("/tasks");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Invalid credentials, please try again.");
     
    }

    setEmail("");
    setPassword("");
  };

  // Redirect if user is already logged in
  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/tasks");
    }
  }, [firebase.isLoggedIn, navigate]);

  return (
    <>
  
      <div className="container">
        <div className="login">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <TextField
              className="input"
              label="Email"
              variant="outlined"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              className="input"
              label="Password"
              variant="outlined"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="login--btn" variant="contained" type="submit">
              Login
            </Button>
            <hr />
            <p>or</p>
            <Button
              onClick={() =>
                firebase
                  .signInOrUpWithGoogle()
                  .then(() => navigate("/tasks"))
                  .catch((error) =>
                    console.error("Google Login failed:", error)
                  )
              }
              variant="contained"
              style={{ backgroundColor: "#ee186a", color: "#fff" }}
            >
              Login with Google
            </Button>
            <br />
            <hr />
            <p>
              Don't have an Account?
              <Button variant="text">
                <Link to="/register" className="sign--up--btn">
                  Sign Up
                </Link>
              </Button>
            </p>
          </form>
          <img src={assets.logImg} alt="illusImage" width="40%" />
        </div>
      </div>
    </>
  );
}

export default Login;
