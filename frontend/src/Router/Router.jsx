import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import CreateJob from "../pages/CreateJob";
import MyJobs from "../pages/MyJobs";
import SalaryPage from "../pages/SalaryPage";
import UpdateJob from "../pages/UpdateJob";
import Login from "../components/Login";
import JobDetails from "../pages/JobDetails";
import SignInPage from "../auth/sign-in/SignInPage";
import UploadResume from "../components/UploadResume";
const router = createBrowserRouter([
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
    ],
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
]);

export default router;
