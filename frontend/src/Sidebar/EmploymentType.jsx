import React from "react";
import InputField from "../components/InputField";

const EmploymentType = ({ handleCategoryChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Type of Employment</h4>
      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handleCategoryChange}
          />
          <span className="checkmark"></span>All
        </label>

        <InputField
          handleCategoryChange={handleCategoryChange}
          value="Full-time"
          title="Full-time"
          name="test"
        />
        <InputField
          handleCategoryChange={handleCategoryChange}
          value="Temporary"
          title="Temporary"
          name="test"
        />
        <InputField
          handleCategoryChange={handleCategoryChange}
          value="Part-time"
          title="Part-time"
          name="test"
        />
      </div>
    </div>
  );
};

export default EmploymentType;
