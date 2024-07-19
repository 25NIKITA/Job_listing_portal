import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./Login.css";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";
import user_email from "../assets/email.png";
import user_profile from "../assets/account.png";
import user_password from "../assets/password.png";

const Login = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const auth = getAuth(app); // Ensure you pass the correct Firebase app instance
  const googleprovider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login successful", data);
      } else {
        console.error("Login failed", data);
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Signup successful", data);
      } else {
        console.error("Signup failed", data);
      }
    } catch (error) {
      console.error("Error during signup", error);
    }
  };

  const handleGoogleLogin = () => {
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
              <input
                type="text"
                placeholder="Write your name here"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="input">
            <img src={user_email} alt="Email Icon" />
            <input
              type="email"
              placeholder="Write your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={user_password} alt="Password Icon" />
            <input
              type="password"
              placeholder="Write your password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={handleLogin}
          >
            Login
          </div>
          {/* <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => setAction("Login")}
          >
            Login
          </div> */}
          {/* <div
            className="submit"
            onClick={action === "Login" ? handleLogin : handleSignup}
          >
            {action}
          </div> */}
          <div className="submit" onClick={handleGoogleLogin}>
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
