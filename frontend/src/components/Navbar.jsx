import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
// import { Button } from "../components/ui/button";
// import { UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  // const { user, isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navItems = [
    { path: "/", title: "Start a Search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post a Job" },
  ];
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          <img src="https://img.icons8.com/?size=60&id=53589&format=png&color=000000"></img>
          <span>Job Portal</span>
        </a>
        {/*nav items for large devices*/}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/*signup and login btn*/}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          {/* <Link to="/login" className="py-2 px-5 border rounded">
            Login
          </Link> */}
          {/* <Link
            to="/sign-up"
            className="py-2 px-5 border rounded bg-blue-500 text-white"
          >
            Sign In
          </Link> */}
          {/* {isSignedIn ? (
            <div className="flex gap-2 items-center">
              <Link to={"/auth/sign-in"}>
                <button className="py-2 px-5 border rounded bg-blue-500-500 text-white">
                  Logout
                </button>
              </Link>
              <UserButton />
            </div>
          ) : (
            <Link to="/auth/sign-in">
              <button className="py-2 px-5 border rounded bg-blue-500-500 text-white">
                Get Started
              </button>
            </Link>
          )} */}
          {userDetails ? (
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {/* <img
                  src={userDetails.photo}
                  width={"40%"}
                  style={{ borderRadius: "50%" }}
                /> */}
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-black font-bold text-[17px] border p-[7px] bg-gray-200 rounded">
                  Welcome {userDetails.firstName}
                </p>
                {/* <div>
                <p>Email: {userDetails.email}</p>
                <p>First Name: {userDetails.firstName}</p>
              </div> */}
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            // <p>Loading...</p>
            <></>
          )}
        </div>

        {/*mobile menu*/}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBars className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/*navitems for mobile*/}
      <div className={`px-4 py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base text-white first:text-white py-1"
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}

          <li className="text-white py-1">
            <Link to="/login" className="py-2 rounded">
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
