import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PageHeader from "../components/PageHeader";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  // console.log(id)\
  useEffect(() => {
    fetch(`http://localhost:5173/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, []);
  const handleApply = async () => {
    // alert('Applied Successfully');
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "URL address",
      inputPlaceholder: "Enter the URL",
    });
    if (url) {
      Swal.fire(`Entered URL: ${url}`);
    }
  };
  return (
    <div className="max--screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"Single Job Page"} path={"single job"} />
      {/* <h2>JobDetails: {id}</h2> */}
      <h1>{job.jobTitle}</h1>
      <button
        onClick={handleApply}
        className="bg-blue-500 px-8 py-2 text-white"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;
