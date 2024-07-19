import React from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";
const Uploadresume = () => {
  window.location.href = "/upload-resume";
};

const Newsletter = () => {
  return (
    <div>
      <div>
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaEnvelopeOpenText />
          Email us for jobs
        </h3>
        <div className="w-full space-y-4">
          <input
            type="email"
            name="email"
            placeholder="name@gmail.com"
            className="w-full block py-2 pl-3 border focus:outline-none"
          />
          <input
            type="submit"
            value={"Subscribe"}
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </div>
      </div>

      <div className="mt-20">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket />
          Get Noticed Faster
        </h3>
        <p className="text-primary/70 text-base mb-4">
          Upload your resume and get a higher chance f getting selected by the
          recruiters
        </p>
        <div className="w-full space-y-4">
          <input
            type="submit"
            value="Upload your Resume"
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold"
            onClick={Uploadresume}
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
