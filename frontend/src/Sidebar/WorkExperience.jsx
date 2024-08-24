import React from "react";
import InputField from "../components/InputField";
const WorkExperience = ({ handleCategoryChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2 pl-4">Work Experience</h4>
      <div className="pl-4">
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handleCategoryChange}
          />
          <span className="checkmark"></span>Any Experience
        </label>

        <InputField
          handleCategoryChange={handleCategoryChange}
          value="Internship"
          title="Intership"
          name="test"
        />
        <InputField
          handleCategoryChange={handleCategoryChange}
          value="Work remotely"
          title="Work remotely"
          name="test"
        />
      </div>
    </div>
  );
};

export default WorkExperience;
