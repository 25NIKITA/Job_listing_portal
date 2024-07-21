import React from "react";
import Location from "./Location";
import Salary from "./Salary";
import JobPostingDate from "./JobPostingDate";
import WorkExperience from "./WorkExperience";
import EmploymentType from "./EmploymentType";

const Sidebar = ({ handleCategoryChange, handleButtonClick }) => {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold mb-2">Filters</h3>
      <Location handleCategoryChange={handleCategoryChange} />
      <Salary
        handleCategoryChange={handleCategoryChange}
        handleButtonClick={handleButtonClick}
      />
      <JobPostingDate handleCategoryChange={handleCategoryChange} />
      <WorkExperience handleCategoryChange={handleCategoryChange} />
      <EmploymentType handleCategoryChange={handleCategoryChange} />
    </div>
  );
};

export default Sidebar;
