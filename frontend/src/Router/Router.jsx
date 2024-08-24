import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import CreateJob from "../pages/CreateJob";
import MyJobs from "../pages/MyJobs";
import SalaryPage from "../pages/SalaryPage";
import UpdateJob from "../pages/UpdateJob";
import JobDetails from "../pages/JobDetails";
import SignInPage from "../auth/sign-in/SignInPage";
import UploadResume from "../components/UploadResume";
import Login from "../components/loginpage";
import SignUp from "../components/register";
import AuthWrapper from "../components/AuthWrapper";

const createRouter = (user) =>
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/post-job",
          element: <CreateJob />,
        },
        {
          path: "/my-job",
          element: <MyJobs />,
        },
        {
          path: "/salary",
          element: <SalaryPage />,
        },
        {
          path: "edit-job/:id",
          element: <UpdateJob />,
          loader: ({ params }) =>
            fetch(`http://localhost:5000/all-jobs/${params.id}`),
        },
        {
          path: "/job/:id",
          element: <JobDetails />,
        },
        {
          path: "/upload-resume",
          element: <UploadResume />,
        },
        {
          path: "/login",
          element: (
            <AuthWrapper>
              <Login />
            </AuthWrapper>
          ),
        },
        {
          path: "/register",
          element: (
            <AuthWrapper>
              <SignUp />
            </AuthWrapper>
          ),
        },
      ],
    },
    // {
    //   path: "/auth/sign-in",
    //   element: <SignInPage />,
    // },
  ]);

export default createRouter;

// // strict login
// import {
//   createBrowserRouter,
//   RouterProvider,
//   useOutletContext,
//   Navigate,
// } from "react-router-dom";
// import App from "../App";
// import Home from "../pages/Home";
// import About from "../pages/About";
// import CreateJob from "../pages/CreateJob";
// import MyJobs from "../pages/MyJobs";
// import SalaryPage from "../pages/SalaryPage";
// import UpdateJob from "../pages/UpdateJob";
// import JobDetails from "../pages/JobDetails";
// import UploadResume from "../components/UploadResume";
// import Login from "../components/loginpage";
// import SignUp from "../components/register";
// import AuthWrapper from "../components/AuthWrapper";

// function ProtectedRoute({ children }) {
//   const { user } = useOutletContext();
//   return user ? children : <Navigate to="/login" />;
// }

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: (
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/about",
//         element: (
//           <ProtectedRoute>
//             <About />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/post-job",
//         element: (
//           <ProtectedRoute>
//             <CreateJob />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/my-job",
//         element: (
//           <ProtectedRoute>
//             <MyJobs />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/salary",
//         element: (
//           <ProtectedRoute>
//             <SalaryPage />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "edit-job/:id",
//         element: (
//           <ProtectedRoute>
//             <UpdateJob />
//           </ProtectedRoute>
//         ),
//         loader: ({ params }) =>
//           fetch(`http://localhost:5000/all-jobs/${params.id}`),
//       },
//       {
//         path: "/job/:id",
//         element: (
//           <ProtectedRoute>
//             <JobDetails />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/upload-resume",
//         element: (
//           <ProtectedRoute>
//             <UploadResume />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/login",
//         element: (
//           <AuthWrapper>
//             <Login />
//           </AuthWrapper>
//         ),
//       },
//       {
//         path: "/register",
//         element: (
//           <AuthWrapper>
//             <SignUp />
//           </AuthWrapper>
//         ),
//       },
//     ],
//   },
// ]);

// function Root() {
//   return <RouterProvider router={router} />;
// }

// export default Root;

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "../App";
// import Home from "../pages/Home";
// import About from "../pages/About";
// import CreateJob from "../pages/CreateJob";
// import MyJobs from "../pages/MyJobs";
// import SalaryPage from "../pages/SalaryPage";
// import UpdateJob from "../pages/UpdateJob";
// import JobDetails from "../pages/JobDetails";
// import UploadResume from "../components/UploadResume";
// import Login from "../components/loginpage";
// import SignUp from "../components/register";
// import AuthWrapper from "../components/AuthWrapper";
// import ProtectedRoute from "../components/ProtectedRoute"; // Adjust the path as needed

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: (
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/about",
//         element: (
//           <ProtectedRoute>
//             <About />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/post-job",
//         element: (
//           <ProtectedRoute>
//             <CreateJob />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/my-job",
//         element: (
//           <ProtectedRoute>
//             <MyJobs />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/salary",
//         element: (
//           <ProtectedRoute>
//             <SalaryPage />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "edit-job/:id",
//         element: (
//           <ProtectedRoute>
//             <UpdateJob />
//           </ProtectedRoute>
//         ),
//         loader: ({ params }) =>
//           fetch(`http://localhost:5000/all-jobs/${params.id}`),
//       },
//       {
//         path: "/job/:id",
//         element: (
//           <ProtectedRoute>
//             <JobDetails />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/upload-resume",
//         element: (
//           <ProtectedRoute>
//             <UploadResume />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/login",
//         element: (
//           <AuthWrapper>
//             <Login />
//           </AuthWrapper>
//         ),
//       },
//       {
//         path: "/register",
//         element: (
//           <AuthWrapper>
//             <SignUp />
//           </AuthWrapper>
//         ),
//       },
//     ],
//   },
// ]);

// function Root() {
//   return <RouterProvider router={router} />;
// }

// export default Root;
