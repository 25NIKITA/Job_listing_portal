// import { signInWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { auth } from "./firebase";
// import { toast } from "react-toastify";
// import SignInwithGoogle from "./signInWIthGoogle";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       console.log("User logged in Successfully");
//       window.location.href = "/";
//       toast.success("User logged in Successfully", {
//         position: "top-center",
//       });
//     } catch (error) {
//       console.log(error.message);

//       toast.error(error.message, {
//         position: "bottom-center",
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3 className="text-3xl font-bold">Login</h3>

//       <div className="mb-3">
//         <label className="font-medium">Email address</label>
//         <input
//           type="email"
//           className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>

//       <div className="mb-3">
//         <label>Password</label>
//         <input
//           type="password"
//           className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>

//       <div className="d-grid">
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </div>
//       <p className="forgot-password text-right">
//         New user <a href="/register">Register Here</a>
//       </p>
//       <SignInwithGoogle />
//     </form>
//   );
// }

// export default Login;

import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("user"); // "user" or "company"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center mb-4 gap-2">
        <button
          onClick={() => handleTabChange("user")}
          className={`px-4 py-2 rounded ${
            activeTab === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          User Login
        </button>
        <button
          onClick={() => handleTabChange("company")}
          className={`px-4 py-2 rounded ${
            activeTab === "company" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Company Login
        </button>
      </div>

      {/* Form */}
      {activeTab === "user" && (
        <form onSubmit={handleSubmit}>
          <h3 className="text-3xl font-bold">User Login</h3>

          <div className="mb-3">
            <label className="font-medium">Email address</label>
            <input
              type="email"
              className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            New user <a href="/register">Register Here</a>
          </p>
          <SignInwithGoogle />
        </form>
      )}

      {activeTab === "company" && (
        <form onSubmit={handleSubmit}>
          <h3 className="text-3xl font-bold">Company Login</h3>

          <div className="mb-3">
            <label className="font-medium">Email address</label>
            <input
              type="email"
              className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            New Employee <a href="/register">Register Here</a>
          </p>
          <SignInwithGoogle />
        </form>
      )}
    </div>
  );
}

export default Login;
