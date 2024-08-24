// import React from "react";
// /*import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import { Route, Routes } from "react-router-dom";
// import Footer from "./components/Footer"; */

// import { Outlet, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";
// import "./App.css";
// import { useUser } from "@clerk/clerk-react";
// import { Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import createRouter from "./Router/Router";
// import { RouterProvider } from "react-router-dom";
// import { auth } from "./components/firebase";
// import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import CreateJob from "./pages/CreateJob";
// import MyJobs from "./pages/MyJobs";
// import SalaryPage from "./pages/SalaryPage";
// import UpdateJob from "./pages/UpdateJob";
// import JobDetails from "./pages/JobDetails";
// import SignInPage from "./auth/sign-in/SignInPage";
// import UploadResume from "./components/UploadResume";
// import Login from "./components/loginpage";
// import SignUp from "./components/register";
// import AuthWrapper from "./components/AuthWrapper";

// function App() {
//   // const { user, isLoaded, isSignedIn } = useUser();
//   // if (!isSignedIn && isLoaded) {
//   //   return <Navigate to={"/auth/sign-in"} />;
//   // }
//   const location = useLocation();
//   const hideNavbarPaths = ["/login", "/register"];
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       console.log("Auth state changed:", user); // Debug information
//       setUser(user);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);
//   if (loading) {
//     return <div>Loading...</div>; // Render a loading state while checking the user
//   }

//   const router = createRouter(user);
//   return (
//     <>
//       {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
//       <ToastContainer />
//       <Routes>
//         <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
//         <Route path="/post-job" element={<CreateJob />} />
//         <Route path="/my-job" element={<MyJobs />} />
//         <Route path="/salary" element={<SalaryPage />} />
//         <Route
//           path="edit-job/:id"
//           element={<UpdateJob />}
//           loader={({ params }) =>
//             fetch(`http://localhost:5000/all-jobs/${params.id}`)
//           }
//         />
//         <Route path="/job/:id" element={<JobDetails />} />
//         <Route path="/upload-resume" element={<UploadResume />} />
//         <Route
//           path="/login"
//           element={
//             <AuthWrapper>
//               <Login />
//             </AuthWrapper>
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             <AuthWrapper>
//               <SignUp />
//             </AuthWrapper>
//           }
//         />
//       </Routes>
//       <Outlet />
//     </>
//   );
// }

// export default App;

// Job Update
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";
import { auth } from "./components/firebase";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateJob from "./pages/CreateJob";
import MyJobs from "./pages/MyJobs";
import SalaryPage from "./pages/SalaryPage";
import UpdateJob from "./pages/UpdateJob";
import JobDetails from "./pages/JobDetails";
import Login from "./components/loginpage";
import SignUp from "./components/register";
import AuthWrapper from "./components/AuthWrapper";
import UploadResume from "./components/UploadResume";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const hideNavbarPaths = ["/login", "/register"];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/post-job"
          element={user ? <CreateJob /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-job"
          element={user ? <MyJobs /> : <Navigate to="/login" />}
        />
        <Route
          path="/salary"
          element={user ? <SalaryPage /> : <Navigate to="/login" />}
        />
        <Route
          path="edit-job/:id"
          element={user ? <UpdateJob /> : <Navigate to="/login" />}
        />
        <Route
          path="/job/:id"
          element={user ? <JobDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/upload-resume"
          element={user ? <UploadResume /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            <AuthWrapper>
              <Login />
            </AuthWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <AuthWrapper>
              <SignUp />
            </AuthWrapper>
          }
        />
      </Routes>
    </>
  );
};

export default App;

// import React, { useEffect, useState } from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import {
//   RouterProvider,
//   createBrowserRouter,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import router from "./Router/Router"; // Import the router configuration
// import Navbar from "./components/Navbar";
// import { auth } from "./components/firebase";
// import Login from "./components/loginpage";
// import SignUp from "./components/register";
// import Home from "./pages/Home";

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Conditionally render the routes based on authentication status
//   return (
//     <div className="App">
//       <Navbar />
//       <div className="auth-wrapper">
//         <div className="auth-inner">
//           {/* <Routes>
//             <Route
//               path="/"
//               element={user ? <Navigate to="/profile" /> : <Login />}
//             />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<SignUp />} />
//             <Route
//               path="/profile"
//               element={user ? <Home /> : <Navigate to="/login" />}
//             />

//           </Routes> */}
//           <RouterProvider
//             router={router}
//             // This condition can be handled in Router.jsx or individual components
//           />
//           <ToastContainer />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// Strict login condition
// import React, { useEffect, useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import { auth } from "./components/firebase"; // Adjust the path to your firebase configuration
// import Navbar from "./components/Navbar";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";
// import "./App.css";

// function App() {
//   const [user, setUser] = useState(null);
//   const location = useLocation();
//   const hideNavbarPaths = ["/login", "/register"];

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   return (
//     <>
//       {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
//       <ToastContainer />
//       <Outlet context={{ user }} />
//     </>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import { auth } from "./components/firebase"; // Adjust the path to your firebase configuration
// import Navbar from "./components/Navbar";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";
// import "./App.css";
// import { UserContext } from "./UserContext"; // Import UserContext

// function App() {
//   const [user, setUser] = useState(null);
//   const location = useLocation();
//   const hideNavbarPaths = ["/login", "/register"];

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   return (
//     <UserContext.Provider value={user}>
//       {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
//       <ToastContainer />
//       <Outlet />
//     </UserContext.Provider>
//   );
// }

// export default App;
