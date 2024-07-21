import React from "react";
/*import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer"; */
import "./index.css";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

function App() {
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/sign-in"} />;
  }
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
    </>
  );
}

export default App;
