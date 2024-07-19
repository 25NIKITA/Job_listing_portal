import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./Signup.css";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";
import user_email from "../assets/email.png";
import user_profile from "../assets/account.png";
import user_password from "../assets/password.png";

const Signup = () => {
  const [action, setAction] = useState("Signup");
  const auth = getAuth(app); // Ensure you pass the correct Firebase app instance
  const googleprovider = new GoogleAuthProvider();

  const handleLogin = () => {
    signInWithPopup(auth, googleprovider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <div>
      <div className="containerLogin">
        <div className="headerLogin">
          <div className="textLogin">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Login" ? (
            <div></div>
          ) : (
            <div className="input">
              <img src={user_profile} alt="Profile Icon" />
              <input type="text" placeholder="Write your name here" />
            </div>
          )}
          <div className="input">
            <img src={user_email} alt="Email Icon" />
            <input type="email" placeholder="Write your email here" />
          </div>
          <div className="input">
            <img src={user_password} alt="Password Icon" />
            <input type="password" placeholder="Write your password here" />
          </div>
        </div>
        {action === "Sign Up" ? (
          <div></div>
        ) : (
          <div className="forget-password">
            Forget Password? <span>Click Here</span>
          </div>
        )}

        <div className="submit-container">
          <div
            className={action === "Signup" ? "submit gray" : "submit"}
            onClick={() => setAction("Sign Up")}
          >
            Sign Up
          </div>
          {/* <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => setAction("Signup")}
          >
            Signup
          </div> */}
          <div className="submit" onClick={handleLogin}>
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
