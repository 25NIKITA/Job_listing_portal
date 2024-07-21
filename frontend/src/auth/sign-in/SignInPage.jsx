import { SignIn } from "@clerk/clerk-react";
import React from "react";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center mt-20">
      <SignIn />
    </div>
  );
};

export default SignInPage;
