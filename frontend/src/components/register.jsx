// import { createUserWithEmailAndPassword } from "firebase/auth";
// import React, { useState } from "react";
// import { auth, db } from "./firebase";
// import { setDoc, doc } from "firebase/firestore";
// import { toast } from "react-toastify";

// function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fname, setFname] = useState("");
//   const [lname, setLname] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       const user = auth.currentUser;
//       console.log(user);
//       if (user) {
//         await setDoc(doc(db, "Users", user.uid), {
//           email: user.email,
//           firstName: fname,
//           lastName: lname,
//           photo: "",
//         });
//       }
//       console.log("User Registered Successfully!!");
//       toast.success("User Registered Successfully!!", {
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
//     <form onSubmit={handleRegister}>
//       <h3 className="text-3xl font-bold">Sign Up</h3>

//       <div className="mb-3">
//         <label>First name</label>
//         <input
//           type="text"
//           className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
//           placeholder="First name"
//           onChange={(e) => setFname(e.target.value)}
//           required
//         />
//       </div>

//       <div className="mb-3">
//         <label>Last name</label>
//         <input
//           type="text"
//           className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
//           placeholder="Last name"
//           onChange={(e) => setLname(e.target.value)}
//         />
//       </div>

//       <div className="mb-3">
//         <label>Email address</label>
//         <input
//           type="email"
//           className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
//           placeholder="Enter email"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>

//       <div className="mb-3">
//         <label>Password</label>
//         <input
//           type="password"
//           className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
//           placeholder="Enter password"
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>

//       <div className="d-grid">
//         <button type="submit" className="btn btn-primary">
//           Sign Up
//         </button>
//       </div>
//       <p className="forgot-password text-right">
//         Already registered <a href="/login">Login</a>
//       </p>
//     </form>
//   );
// }
// export default Register;

import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [activeTab, setActiveTab] = useState("user"); // "user" or "company"

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        if (activeTab === "user") {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: fname,
            lastName: lname,
            photo: "",
          });
        } else if (activeTab === "company") {
          await setDoc(doc(db, "Companies", user.uid), {
            email: user.email,
            companyName: fname, // Assuming `fname` is used for company name in this context
            photo: "",
          });
        }
      }
      console.log("Registered Successfully!!");
      toast.success("Registered Successfully!!", {
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
          User Registration
        </button>
        <button
          onClick={() => handleTabChange("company")}
          className={`px-4 py-2 rounded ${
            activeTab === "company" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Company Registration
        </button>
      </div>

      {/* Form */}
      {activeTab === "user" && (
        <form onSubmit={handleRegister}>
          <h3 className="text-3xl font-bold">User Sign Up</h3>

          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">Login</a>
          </p>
        </form>
      )}

      {activeTab === "company" && (
        <form onSubmit={handleRegister}>
          <h3 className="text-3xl font-bold">Company Sign Up</h3>

          <div className="mb-3">
            <label>Company Name</label>
            <input
              type="text"
              className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
              placeholder="Company name"
              onChange={(e) => setFname(e.target.value)} // Using `fname` for company name here
              required
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control focus:border-[#167bff] focus:border-2 focus:shadow"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">Login</a>
          </p>
        </form>
      )}
    </div>
  );
}

export default Register;
