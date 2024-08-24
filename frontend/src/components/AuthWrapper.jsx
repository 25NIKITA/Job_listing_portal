import { useLocation } from "react-router-dom";
import "../index.css";

function AuthWrapper({ children }) {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={`App ${isAuthPage ? "auth-wrapper" : ""}`}>
      <div className={`auth-inner ${isAuthPage ? "auth-inner" : ""}`}>
        {children}
      </div>
    </div>
  );
}

export default AuthWrapper;
