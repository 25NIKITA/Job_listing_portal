import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useState } from "react";

const CreateJob = () => {
  const [selectedOption, setSelectedOptions] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.skills = selectedOption;
    fetch(`http://localhost:5000/post-job`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged === true) {
          alert("Job posted successfully");
        }
        reset();
      });
  };
  const options = [
    { label: "Python", value: "Python" },
    { label: "JavaScript", value: "JavaScript" },
    { label: "React", value: "React" },
    { label: "Node.js", value: "Node.js" },
    { label: "Express", value: "Express" },
    { label: "MongoDB", value: "MongoDB" },
    { label: "PostgreSQL", value: "PostgreSQL" },
    { label: "MySQL", value: "MySQL" },
    { label: "Docker", value: "Docker" },
    { label: "AWS", value: "AWS" },
    { label: "GCP", value: "GCP" },
    { label: "Azure", value: "Azure" },
    { label: "HTML", value: "HTML" },
    { label: "CSS", value: "CSS" },
    { label: "Sass", value: "Sass" },
  ];

  return (
    <div>
      <div className="max-w-screen-2xl container mx-auto xl:px-24  px-4">
        {/**form */}
        <div className="bg-[#FAFAFA] py-10 px-4 1g:px-16">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/*first row */}
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg ">Job Title</label>
                <input
                  type="text"
                  defaultValue={"Web Developer"}
                  {...register("jobTitle")}
                  className="create-job-input"
                />
              </div>
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg ">Company Name</label>
                <input
                  type="text"
                  placeholder="Ex:Microsoft"
                  {...register("companyName")}
                  className="create-job-input"
                />
              </div>
            </div>
            {/**Second row */}
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg ">Minimum Salary</label>
                <input
                  type="text"
                  placeholder="$20k"
                  {...register("minPrice")}
                  className="create-job-input"
                />
              </div>
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg ">Maximum Salary</label>
                <input
                  type="text"
                  placeholder="$120k"
                  {...register("maxPrice")}
                  className="create-job-input"
                />
              </div>
            </div>
            {/**Third Row */}
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg ">Salary Type</label>
                <select
                  {...register("salaryType")}
                  className="create-job-input"
                >
                  <option value="">Choose your Salary</option>
                  <option value="hourly">hourly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg ">Job Location</label>
                <input
                  type="text"
                  placeholder="EX:New York"
                  {...register("jobLocation")}
                  className="create-job-input"
                />
              </div>
            </div>
            {/**fourth Row */}
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg ">Job Posting Date</label>
                <input
                  type="date"
                  placeholder="2023-10-28"
                  {...register("postingDate")}
                  className="create-job-input"
                />
              </div>
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg ">Experience Level</label>
                <select
                  {...register("experienceLevel")}
                  className="create-job-input"
                >
                  <option value="">Choose your Experience</option>
                  <option value="No Experience">No Experience</option>
                  <option value="Internship">Internship</option>
                  <option value="Work Remotely">Work Remotely</option>
                </select>
              </div>
            </div>
            {/**fifth Row */}
            <div>
              <label className="block mb-2 text-lg">Required Skill Sets:</label>
              <CreatableSelect
                defaultValue={selectedOption}
                onChange={setSelectedOptions}
                options={options}
                isMulti
                className="create-job-input py-4"
              />
            </div>
            {/**Sixth Row */}
            <div className="create-job-flex">
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg ">Company Logo</label>
                <input
                  type="url"
                  placeholder="Paste your company logo URL:https://wetransfer.com/img1"
                  {...register("companyLogo")}
                  className="create-job-input"
                />
              </div>
              <div className="lg:w-1/2 w-full">
                <label className="block mb-2 text-lg ">Employment Type</label>
                <select
                  {...register("employmentType")}
                  className="create-job-input"
                >
                  <option value="">Choose your Employment Type</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                </select>
              </div>
            </div>
            {/**seventh Row */}
            <div className="w-full">
              <label className="block mb-2 text-lg">Job Description</label>
              <textarea
                className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-600"
                rows={6}
                defaultValue={
                  "MERN Stack Job Portal using React, MongoDB, Node, Express.js & Tailwind CSS"
                }
                placeholder="Job Description"
                {...register("description")}
              />
            </div>
            {/**last row */}
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg ">Job Posted by</label>
              <input
                type="email"
                placeholder="your email"
                {...register("postedBy")}
                className="create-job-input"
              />
            </div>
            <div />
            <input
              type="submit"
              className="block mt-12 bg-blue-500 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
