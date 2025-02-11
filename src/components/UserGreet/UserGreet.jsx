import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/firebaseContext";
import "./usergreet.css"

function UserGreet() {
  const firebase = useFirebase();
  const [userName, setUserName] = useState("");

 let now = Date.now();
 let todayDate = new Date(now);

 let formattedDate = `${todayDate.toLocaleDateString("en-US", {
   weekday: "long",
 })} ${todayDate.getDate()}, ${todayDate.toLocaleDateString("en-US", {
   month: "long",
   year: "numeric",
 })}`;

//  console.log(formattedDate);

  useEffect(() => {
    if (firebase.user) {
      const currUser = firebase.user.displayName;
      setUserName(currUser || "Guest");
      console.log(currUser);
    }
  }, [firebase.user]);

  return (
    <div className="user--greet">
      {userName ? (
        <h2>
          <span>Hi, {userName}!</span>
          <br />
          Let's make today productive!
        </h2>
      ) : (
        <p>Loading...</p> 
      )}
      
        <h5 className="date--head">{formattedDate}</h5>

      
    </div>
   
  );
}

export default UserGreet;
