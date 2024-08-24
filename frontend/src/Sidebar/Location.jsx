import React from "react";
import InputField from "../components/InputField";

const Location = ({ handleCategoryChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2 pl-4">Location</h4>
      <div className="pl-4">
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
          value="london"
          title="London"
          name="test"
        />
        <InputField
          handleCategoryChange={handleCategoryChange}
          value="seattle"
          title="Seattle"
          name="test"
        />
        <InputField
          handleCategoryChange={handleCategoryChange}
          value="madrid"
          title="Madrid"
          name="test"
        />
        <InputField
          handleCategoryChange={handleCategoryChange}
          value="boston"
          title="Boston"
          name="test"
        />
      </div>
    </div>
  );
};

export default Location;
