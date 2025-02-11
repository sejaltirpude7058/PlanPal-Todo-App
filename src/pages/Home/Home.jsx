import React, {useEffect} from 'react'
import { assets } from '../../assets/assets'
import Button from "@mui/material/Button";
import { useFirebase } from '../../context/firebaseContext';
import { useNavigate } from 'react-router-dom';
import "./home.css"

function Home() {
const firebase = useFirebase();
const navigate = useNavigate();

   useEffect(() => {
     if (firebase.isloggedIn) {
       navigate("/tasks");
     }
   }, [firebase, navigate]);


    return (
      <div className="container">
        <div className="home">
         
          <img src={assets.homeImg} alt="Home Image" width="350px" />
          <div className="about--section">
            <h1 className="home--head">
              Your journey to productivity starts here.
            </h1>
            <p className='home--para'>
              Organize your life effortlessly! This app helps you track tasks,
              set priorities, and stay productive one step at a time. Start your
              journey to better productivity today!
            </p>
          </div>
          <Button onClick={() => navigate("/login")}
            className="home--btn"
            variant="contained"
          >
            Let's get Started!
          </Button>
        </div>
      </div>
    );
}

export default Home
