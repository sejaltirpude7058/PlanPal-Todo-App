import React, { useState, useEffect } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useFirebase } from '../../context/firebaseContext';
import "./register.css"
import { useNavigate } from 'react-router-dom';


function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const firebase = useFirebase()
  const navigate = useNavigate()


  const validatePassword = (password) => {
    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!uppercaseRegex.test(password)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!lowercaseRegex.test(password)) {
      return "Password must include at least one lowercase letter.";
    }
    if (!numberRegex.test(password)) {
      return "Password must include at least one digit.";
    }
    if (!specialCharRegex.test(password)) {
      return "Password must include at least one special character.";
    }

    return "Valid";
  };

  const handleSignUp = async () => {
    const passwordValidation = validatePassword(password);
    if (passwordValidation !== "Valid") {
      alert(passwordValidation);
     
      return;
    }
    try {
      await firebase.signUpUser(email, password, fullName);
    
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted Successfully")
    
    setEmail("")
    setFullName("")
    setPassword("")

  }

   useEffect(() => {
     if (firebase.isloggedIn) {
       navigate("/tasks");
     }
   }, [firebase, navigate]);


    return (
      <>
        <div className="register--Container">
          <div className="register">
            {/* <img src={assets.registerImg} alt="image" width="35%" /> */}
            <form onSubmit={handleSubmit} className="form-container">
              <h1>Sign Up</h1>
              <TextField
                className="register--input"
                label="Full Name"
                variant="outlined"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextField
                className="register--input"
                label="Email"
                variant="outlined"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                className="register--input"
                label="Password"
                variant="outlined"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button onClick={handleSignUp} variant="contained">
                Sign Up
              </Button>
              <p>or</p>
              <Button
                onClick={firebase.signInOrUpWithGoogle}
                variant="contained"
                style={{ backgroundColor: "#ee186a", color: "#fff" }}
              >
                Sign up with Google
              </Button>
              <br />
              <hr />
              <p>
                Already have an Account
                <Button variant="text" style={{ margin: "5px" }}>
                  <Link to="/login" className="sign--in--btn">
                    Sign in
                  </Link>
                </Button>
              </p>
            </form>
            <img src={assets.registerImg} alt="image" width="35%" />
          </div>
        </div>
      </>
    );
}

export default Register
