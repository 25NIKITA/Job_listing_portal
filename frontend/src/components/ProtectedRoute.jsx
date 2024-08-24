import React from "react";
import { useUser } from "../UserContext"; // Adjust the path as needed
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = useUser();
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
