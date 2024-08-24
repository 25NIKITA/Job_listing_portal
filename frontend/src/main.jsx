import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";
// import router from "./Router/Router.jsx";
// import { ClerkProvider } from "@clerk/clerk-react";

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   {/* <ClerkProvider
  //     publishableKey={PUBLISHABLE_KEY}
  //     afterSignOutUrl="/auth/sign-in"
  //   >
  //     <RouterProvider router={router} />
  //   </ClerkProvider> */}
  //   {/* <App /> */}
  //   {/* <RouterProvider router={router} /> */}
  // </React.StrictMode>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom";
// import Root from "./Router/Router"; // Adjust the import to the correct path

// ReactDOM.render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
